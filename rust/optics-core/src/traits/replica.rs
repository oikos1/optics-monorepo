use async_trait::async_trait;
use ethers::core::types::{H256, U256};

use crate::{
    accumulator::merkle::Proof,
    traits::{ChainCommunicationError, Common, TxOutcome},
    OpticsMessage,
};

/// Interface for on-chain replicas
#[async_trait]
pub trait Replica: Common + Send + Sync + std::fmt::Debug {
    /// Return the replica domain ID
    fn local_domain(&self) -> u32;

    /// Return the domain of the replica's linked home
    async fn remote_domain(&self) -> Result<u32, ChainCommunicationError>;

    /// Return the pending root and time, if any
    async fn next_pending(&self) -> Result<Option<(H256, U256)>, ChainCommunicationError>;

    /// Returns true/false based on whether or not pending root's time has elapsed
    async fn can_confirm(&self) -> Result<bool, ChainCommunicationError>;

    /// Confirm the next pending root (after its timer has elapsed);
    async fn confirm(&self) -> Result<TxOutcome, ChainCommunicationError>;

    /// Fetch the previous root.
    async fn previous_root(&self) -> Result<H256, ChainCommunicationError>;

    /// Fetch the last processed sequence number
    async fn next_to_process(&self) -> Result<U256, ChainCommunicationError>;

    /// Dispatch a transaction to prove inclusion of some leaf in the replica.
    async fn prove(&self, proof: &Proof) -> Result<TxOutcome, ChainCommunicationError>;

    /// Trigger processing of a message
    async fn process(&self, message: &OpticsMessage) -> Result<TxOutcome, ChainCommunicationError>;

    /// Prove a leaf in the replica and then process its message
    async fn prove_and_process(
        &self,
        message: &OpticsMessage,
        proof: &Proof,
    ) -> Result<TxOutcome, ChainCommunicationError> {
        self.prove(proof).await?;

        Ok(self.process(message).await?)
    }
}
