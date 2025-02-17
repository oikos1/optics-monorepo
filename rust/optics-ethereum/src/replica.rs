use async_trait::async_trait;
use ethers::contract::abigen;
use ethers::core::types::{Address, Signature, H256, U256};
use optics_core::{
    accumulator::merkle::Proof,
    traits::{ChainCommunicationError, Common, DoubleUpdate, Replica, State, TxOutcome},
    Encode, OpticsMessage, SignedUpdate, Update,
};

use std::{convert::TryFrom, error::Error as StdError, sync::Arc};

#[allow(missing_docs)]
abigen!(
    EthereumReplicaInternal,
    "./optics-ethereum/abis/Replica.abi.json",
     methods {
        initialize(address) as initialize_common;
        initialize(uint32, address, bytes32, uint256, uint256) as initialize;
     },
);

/// A struct that provides access to an Ethereum replica contract
#[derive(Debug)]
pub struct EthereumReplica<M>
where
    M: ethers::providers::Middleware,
{
    contract: EthereumReplicaInternal<M>,
    domain: u32,
    name: String,
}

impl<M> EthereumReplica<M>
where
    M: ethers::providers::Middleware,
{
    /// Create a reference to a Replica at a specific Ethereum address on some
    /// chain
    pub fn new(name: &str, domain: u32, address: Address, provider: Arc<M>) -> Self {
        Self {
            contract: EthereumReplicaInternal::new(address, provider),
            domain,
            name: name.to_owned(),
        }
    }
}

#[async_trait]
impl<M> Common for EthereumReplica<M>
where
    M: ethers::providers::Middleware + 'static,
{
    fn name(&self) -> &str {
        &self.name
    }

    #[tracing::instrument(err)]
    async fn status(&self, txid: H256) -> Result<Option<TxOutcome>, ChainCommunicationError> {
        let receipt_opt = self
            .contract
            .client()
            .get_transaction_receipt(txid)
            .await
            .map_err(|e| Box::new(e) as Box<dyn StdError + Send + Sync>)?;

        Ok(receipt_opt.map(Into::into))
    }

    #[tracing::instrument(err)]
    async fn updater(&self) -> Result<H256, ChainCommunicationError> {
        Ok(self.contract.updater().call().await?.into())
    }

    #[tracing::instrument(err)]
    async fn state(&self) -> Result<State, ChainCommunicationError> {
        let state = self.contract.state().call().await?;
        match state {
            0 => Ok(State::Waiting),
            1 => Ok(State::Failed),
            _ => unreachable!(),
        }
    }

    #[tracing::instrument(err)]
    async fn current_root(&self) -> Result<H256, ChainCommunicationError> {
        Ok(self.contract.current().call().await?.into())
    }

    #[tracing::instrument(err)]
    async fn signed_update_by_old_root(
        &self,
        old_root: H256,
    ) -> Result<Option<SignedUpdate>, ChainCommunicationError> {
        self.contract
            .update_filter()
            .topic2(old_root)
            .query()
            .await?
            .first()
            .map(|event| {
                let signature = Signature::try_from(event.signature.as_slice())
                    .expect("chain accepted invalid signature");

                let update = Update {
                    home_domain: event.home_domain,
                    previous_root: event.old_root.into(),
                    new_root: event.new_root.into(),
                };

                SignedUpdate { update, signature }
            })
            .map(Ok)
            .transpose()
    }

    #[tracing::instrument(err)]
    async fn signed_update_by_new_root(
        &self,
        new_root: H256,
    ) -> Result<Option<SignedUpdate>, ChainCommunicationError> {
        self.contract
            .update_filter()
            .topic3(new_root)
            .query()
            .await?
            .first()
            .map(|event| {
                let signature = Signature::try_from(event.signature.as_slice())
                    .expect("chain accepted invalid signature");

                let update = Update {
                    home_domain: event.home_domain,
                    previous_root: event.old_root.into(),
                    new_root: event.new_root.into(),
                };

                SignedUpdate { update, signature }
            })
            .map(Ok)
            .transpose()
    }

    #[tracing::instrument(err)]
    async fn update(&self, update: &SignedUpdate) -> Result<TxOutcome, ChainCommunicationError> {
        Ok(self
            .contract
            .update(
                update.update.previous_root.to_fixed_bytes(),
                update.update.new_root.to_fixed_bytes(),
                update.signature.to_vec(),
            )
            .send()
            .await?
            .await?
            .into())
    }

    #[tracing::instrument(err)]
    async fn double_update(
        &self,
        double: &DoubleUpdate,
    ) -> Result<TxOutcome, ChainCommunicationError> {
        Ok(self
            .contract
            .double_update(
                double.0.update.previous_root.to_fixed_bytes(),
                [
                    double.0.update.new_root.to_fixed_bytes(),
                    double.1.update.new_root.to_fixed_bytes(),
                ],
                double.0.signature.to_vec(),
                double.1.signature.to_vec(),
            )
            .send()
            .await?
            .await?
            .into())
    }
}

#[async_trait]
impl<M> Replica for EthereumReplica<M>
where
    M: ethers::providers::Middleware + 'static,
{
    fn local_domain(&self) -> u32 {
        self.domain
    }

    async fn remote_domain(&self) -> Result<u32, ChainCommunicationError> {
        Ok(self.contract.remote_domain().call().await?)
    }

    #[tracing::instrument(err)]
    async fn next_pending(&self) -> Result<Option<(H256, U256)>, ChainCommunicationError> {
        let (pending, confirm_at) = self.contract.next_pending().call().await?;

        if confirm_at.is_zero() {
            Ok(None)
        } else {
            Ok(Some((pending.into(), confirm_at)))
        }
    }

    #[tracing::instrument(err)]
    async fn can_confirm(&self) -> Result<bool, ChainCommunicationError> {
        Ok(self.contract.can_confirm().call().await?)
    }

    #[tracing::instrument(err)]
    async fn confirm(&self) -> Result<TxOutcome, ChainCommunicationError> {
        Ok(self.contract.confirm().send().await?.await?.into())
    }

    #[tracing::instrument(err)]
    async fn previous_root(&self) -> Result<H256, ChainCommunicationError> {
        Ok(self.contract.previous().call().await?.into())
    }

    #[tracing::instrument(err)]
    async fn next_to_process(&self) -> Result<U256, ChainCommunicationError> {
        Ok(self.contract.next_to_process().call().await?)
    }

    #[tracing::instrument(err)]
    async fn prove(&self, proof: &Proof) -> Result<TxOutcome, ChainCommunicationError> {
        let mut sol_proof: [[u8; 32]; 32] = Default::default();
        sol_proof
            .iter_mut()
            .enumerate()
            .for_each(|(i, elem)| *elem = proof.path[i].to_fixed_bytes());

        Ok(self
            .contract
            .prove(proof.leaf.into(), sol_proof, proof.index.into())
            .send()
            .await?
            .await?
            .into())
    }

    #[tracing::instrument(err)]
    async fn process(&self, message: &OpticsMessage) -> Result<TxOutcome, ChainCommunicationError> {
        Ok(self
            .contract
            .process(message.to_vec())
            .send()
            .await?
            .await?
            .into())
    }

    #[tracing::instrument(err)]
    async fn prove_and_process(
        &self,
        message: &OpticsMessage,
        proof: &Proof,
    ) -> Result<TxOutcome, ChainCommunicationError> {
        let mut sol_proof: [[u8; 32]; 32] = Default::default();
        sol_proof
            .iter_mut()
            .enumerate()
            .for_each(|(i, elem)| *elem = proof.path[i].to_fixed_bytes());

        Ok(self
            .contract
            .prove_and_process(message.to_vec(), sol_proof, proof.index.into())
            .send()
            .await?
            .await?
            .into())
    }
}
