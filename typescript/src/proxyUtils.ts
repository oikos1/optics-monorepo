import { BytesLike, ethers } from 'ethers';
import { Deploy } from './chain';

import * as contracts from './typechain';

export type BeaconProxy<T extends ethers.Contract> = {
  implementation: T;
  proxy: T;
  beacon: contracts.UpgradeBeacon;
};

export type ProxyAddresses = {
  implementation: string;
  proxy: string;
  beacon: string;
};

export async function deployProxy<T extends ethers.Contract>(
  deploy: Deploy,
  factory: ethers.ContractFactory,
  initData: BytesLike,
  ...deployArgs: any[]
): Promise<BeaconProxy<T>> {
  // deploy in order
  // we cast here because Factories don't have associated types :(
  // this is unsafe if the specified typevar doesn't match the factory output
  const implementation = (await factory.deploy(...deployArgs, {
    gasPrice: deploy.chain.gasPrice,
  })) as T;
  const beacon = await _deployBeacon(deploy, implementation);
  const proxy = await _deployProxy(deploy, beacon, initData);

  // proxy wait(5) implies implementation and beacon wait(5)
  // due to nonce ordering
  await proxy.deployTransaction.wait(5);

  return {
    implementation,
    proxy: factory.attach(proxy.address) as T,
    beacon,
  };
}

// Sets up a new proxy with the same beacon and implementation
export async function duplicate<T extends ethers.Contract>(
  deploy: Deploy,
  prev: BeaconProxy<T>,
  initData: BytesLike,
): Promise<BeaconProxy<T>> {
  const proxy = await _deployProxy(deploy, prev.beacon, initData);
  await proxy.deployTransaction.wait(5);

  return {
    implementation: prev.implementation,
    proxy: prev.proxy.attach(proxy.address) as T,
    beacon: prev.beacon,
  };
}

// returns an UNWAITED beacon
// the TX to deploy may still be in-flight
// We set manual gas here to suppress ethers's preflight checks
async function _deployBeacon(
  deploy: Deploy,
  implementation: ethers.Contract,
): Promise<contracts.UpgradeBeacon> {
  let factory = new contracts.UpgradeBeacon__factory(deploy.chain.deployer);

  let beacon = factory.deploy(
    implementation.address,
    deploy.contracts.upgradeBeaconController!.address,
    { gasPrice: deploy.chain.gasPrice, gasLimit: 2_000_000 },
  );
  return beacon;
}

// return an UNWAITED proxy
// the TX to deploy may still be in-flight
// We set manual gas here to suppress ethers's preflight checks
async function _deployProxy<T>(
  deploy: Deploy,
  beacon: contracts.UpgradeBeacon,
  initData: BytesLike,
): Promise<contracts.UpgradeBeaconProxy> {
  let factory = new contracts.UpgradeBeaconProxy__factory(
    deploy.chain.deployer,
  );

  return await factory.deploy(beacon.address, initData, {
    gasPrice: deploy.chain.gasPrice,
    gasLimit: 1_000_000,
  });
}
