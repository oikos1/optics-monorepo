/// A lightweight incremental merkle, suitable for running on-chain. Stores O
/// (1) data
pub mod incremental;
/// A full incremental merkle. Suitable for running off-chain.
pub mod merkle;

use ethers::core::types::H256;
use lazy_static::lazy_static;
use sha3::{Digest, Keccak256};

/// Tree depth
pub const TREE_DEPTH: usize = 32;
const EMPTY_SLICE: &[H256] = &[];

pub(super) fn hash(preimage: impl AsRef<[u8]>) -> H256 {
    H256::from_slice(Keccak256::digest(preimage.as_ref()).as_slice())
}

pub(super) fn hash_concat(left: impl AsRef<[u8]>, right: impl AsRef<[u8]>) -> H256 {
    H256::from_slice(
        Keccak256::new()
            .chain(left.as_ref())
            .chain(right.as_ref())
            .finalize()
            .as_slice(),
    )
}

lazy_static! {
    /// A cache of the zero hashes for each layer of the tree.
    pub static ref ZERO_HASHES: [H256; TREE_DEPTH + 1] = {
        let mut hashes = [H256::zero(); TREE_DEPTH + 1];
        for i in 0..TREE_DEPTH {
            hashes[i + 1] = hash_concat(hashes[i], hashes[i]);
        }
        hashes
    };
}
