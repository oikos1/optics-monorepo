## Optics Rust implementations

### Setup

- install `rustup`
  - [link here](https://rustup.rs/)
- setup pre-commit hooks: `cp ../pre-commit.sh ../.git/hooks/pre-commit`
  - Note: To bypass pre-commit hooks, pass `--no-verify` after commit message


Note: You should be running >= version `1.52.1` of the rustc compiler, you can see that version with this command and should see similar output: 
```
$ rustup --version
rustup 1.24.2 (755e2b07e 2021-05-12)
info: This is the version for the rustup toolchain manager, not the rustc compiler.
info: The currently active `rustc` version is `rustc 1.52.1 (9bc8c42bb 2021-05-09)`
```

### Useful cargo commands

- `cargo doc --open`
  - generate documentation and open it in a web browser
- `cargo build`
  - compile the project
- `cargo run --example example`
  - run the default executable for the current project
- `cargo test`
  - run the tests

### Useful cargo extensions

- tree
  - show the dependency tree. Allows searching for specific packages
  - install: `cargo install cargo-tree`
  - invoke: `cargo tree`
- clippy
  - search the codebase for a large number of lints and bad patterns
  - install: `rustup component add clippy`
  - invoke: `cargo clippy`
- expand
  - expand macros and procedural macros. Show the code generated by the preprocessor
  - useful for debugging `#[macros]` and `macros!()`
  - install: `cargo install cargo-expand`
  - invoke `cargo expand path::to::module`

### Architecture

The on-chain portions of optics are written in Solidity. The rust portions are
exclusively off-chain. Later, there may be on-chain rust for Near/Solana/
Polkadot.

Optics will be managed by a number of small off-chain programs ("agents"). Each
of these will have a specific role. We want these roles to be simple, and
easily described. Each of these agents will connect to a home chain and any
number of replicas. They need to be configured with chain connection details
and have access to a reliable node for each chain.

Some agent sketches:

- `updater`
  - Needs only a connection to the home chain
  - Signs upate attestations and submits them to the home chain
- `watcher`
  - Observe the home chain
  - Observe as many replicas as possible
  - Cache updates
  - Check for fraud
  - Submit fraud to the home chain
  - if configured, issue emergency stop transactions
- `relayer`
  - Relays signed updates from the home to the replica
  - Ensures updates are confirmed in a timely manner on the replica
- `processor`
  - retrieve leaves from home chain
  - observe >=1 replica
  - generate proofs for the messages
  - submit messages and proofs to the replica for processing
  - config option: gas params

For Ethereum and Celo connections we use
[ethers-rs](https://github.com/gakonst/ethers-rs). Please see the docs
[here](https://docs.rs/ethers/0.2.0/ethers/).

We use the tokio async runtime environment. Please see the docs
[here](https://docs.rs/tokio/1.1.0/tokio/).

### Repo layout

- `optics-core`
  - contains implementations of core primitives
  - this includes
    - traits (interfaces) for the on-chain contracts
    - model implementations of the contracts in rust
    - merkle tree implementations (for provers)
- `optics-base`
  - contains shared utilities for building off-chain agents
  - this includes
    - trait implementations for different chains
    - shared configuration file formats
    - basic setup for an off-chain agent
- `optics-ethereum`
  - interfaces to the ethereum contracts
- TODO: other agents :)

### High-level guide to building an agent

- `cargo new $AGENT_NAME`
- add the new directory name to the workspace `Cargo.toml`
- add dependencies to the new directory's `Cargo.toml`
  - copy most of the dependencies from `optics-base`
- create a new module in `src/$AGENT_NAME.rs`
  - add a new struct
  - implement `optics_base::agent::OpticsAgent` for your struct
  - your `run` function is the business logic of your agent
- create a new settings module `src/settings.rs`
  - reuse the `Settings` objects from `optics_base::settings`
  - make sure to read the docs :)
  - add your own new settings
- in `$AGENT_NAME/src/main.rs`
  - add `mod _____` declarations for your agent and settings modules
  - create `main` and `setup` functions
  - follow the pattern in `optics-base/src/main.rs`
- make a `config` folder and a toml file
  - Make sure to include your own settings from above
