/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  TestXAppConnectionManager,
  TestXAppConnectionManagerInterface,
} from "../TestXAppConnectionManager";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint32",
        name: "domain",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "replica",
        type: "address",
      },
    ],
    name: "ReplicaEnrolled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint32",
        name: "domain",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "replica",
        type: "address",
      },
    ],
    name: "ReplicaUnenrolled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint32",
        name: "domain",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "watcher",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "access",
        type: "bool",
      },
    ],
    name: "WatcherPermissionSet",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    name: "domainToReplica",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "home",
    outputs: [
      {
        internalType: "contract Home",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "isOwner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_replica",
        type: "address",
      },
    ],
    name: "isReplica",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "localDomain",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_replica",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "_domain",
        type: "uint32",
      },
    ],
    name: "ownerEnrollReplica",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_replica",
        type: "address",
      },
    ],
    name: "ownerUnenrollReplica",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "replicaToDomain",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_home",
        type: "address",
      },
    ],
    name: "setHome",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_watcher",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "_domain",
        type: "uint32",
      },
      {
        internalType: "bool",
        name: "_access",
        type: "bool",
      },
    ],
    name: "setWatcherPermission",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_domain",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "_replica",
        type: "address",
      },
      {
        internalType: "address",
        name: "_updater",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_signature",
        type: "bytes",
      },
    ],
    name: "testRecoverWatcherFromSig",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_domain",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "_updater",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "_signature",
        type: "bytes",
      },
    ],
    name: "unenrollReplica",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_watcher",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "_domain",
        type: "uint32",
      },
    ],
    name: "watcherPermission",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50600061001b61006a565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35061006e565b3390565b6115ff8061007d6000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c80638da5cb5b11610097578063b9cff16211610066578063b9cff162146103db578063e0e7a913146103fe578063f2fde38b146104b6578063f31faefb146104e957610100565b80638da5cb5b146103515780638f5d90e014610359578063916c34701461038c5780639fa92f9d146103d357610100565b80635f8b1dba116100d35780635f8b1dba146102c05780636ef0f37f1461030c578063715018a6146103415780638d3638f41461034957610100565b806323738500146101055780632f54bf6e14610207578063427ebef51461024e5780635190bc531461028d575b600080fd5b6101de6004803603608081101561011b57600080fd5b63ffffffff8235169173ffffffffffffffffffffffffffffffffffffffff60208201358116926040830135909116919081019060808101606082013564010000000081111561016957600080fd5b82018360208201111561017b57600080fd5b8035906020019184600183028401116401000000008311171561019d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610528945050505050565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b61023a6004803603602081101561021d57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff1661054f565b604080519115158252519081900360200190f35b61023a6004803603604081101561026457600080fd5b50803573ffffffffffffffffffffffffffffffffffffffff16906020013563ffffffff1661058e565b61023a600480360360208110156102a357600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166105ce565b6102f3600480360360208110156102d657600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166105fe565b6040805163ffffffff9092168252519081900360200190f35b61033f6004803603602081101561032257600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16610616565b005b61033f610705565b6102f361081c565b6101de6108b8565b61033f6004803603602081101561036f57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166108d4565b61033f600480360360608110156103a257600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135169063ffffffff60208201351690604001351515610988565b6101de610ad6565b6101de600480360360208110156103f157600080fd5b503563ffffffff16610af2565b61033f6004803603606081101561041457600080fd5b63ffffffff8235169160208101359181019060608101604082013564010000000081111561044157600080fd5b82018360208201111561045357600080fd5b8035906020019184600183028401116401000000008311171561047557600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610b1a945050505050565b61033f600480360360208110156104cc57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16610d93565b61033f600480360360408110156104ff57600080fd5b50803573ffffffffffffffffffffffffffffffffffffffff16906020013563ffffffff16610f34565b600061054685610537866110a8565b610540866110a8565b856110c1565b95945050505050565b60006105596108b8565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16149050919050565b73ffffffffffffffffffffffffffffffffffffffff8216600090815260046020908152604080832063ffffffff8516845290915290205460ff1692915050565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604090205463ffffffff16151590565b60016020526000908152604090205463ffffffff1681565b61061e6111b7565b73ffffffffffffffffffffffffffffffffffffffff1661063c6108b8565b73ffffffffffffffffffffffffffffffffffffffff16146106be57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b61070d6111b7565b73ffffffffffffffffffffffffffffffffffffffff1661072b6108b8565b73ffffffffffffffffffffffffffffffffffffffff16146107ad57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6000805460405173ffffffffffffffffffffffffffffffffffffffff909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080547fffffffffffffffffffffffff0000000000000000000000000000000000000000169055565b600354604080517f8d3638f4000000000000000000000000000000000000000000000000000000008152905160009273ffffffffffffffffffffffffffffffffffffffff1691638d3638f4916004808301926020929190829003018186803b15801561088757600080fd5b505afa15801561089b573d6000803e3d6000fd5b505050506040513d60208110156108b157600080fd5b5051905090565b60005473ffffffffffffffffffffffffffffffffffffffff1690565b6108dc6111b7565b73ffffffffffffffffffffffffffffffffffffffff166108fa6108b8565b73ffffffffffffffffffffffffffffffffffffffff161461097c57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b610985816111bb565b50565b6109906111b7565b73ffffffffffffffffffffffffffffffffffffffff166109ae6108b8565b73ffffffffffffffffffffffffffffffffffffffff1614610a3057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b73ffffffffffffffffffffffffffffffffffffffff8316600081815260046020908152604080832063ffffffff87168085529083529281902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016861515908117909155815194855291840191909152805191927f517de16b526853f481451c5151e87484e1b251ec7d0302efa1019c2ece179c2c929081900390910190a2505050565b60035473ffffffffffffffffffffffffffffffffffffffff1681565b60026020526000908152604090205473ffffffffffffffffffffffffffffffffffffffff1681565b63ffffffff831660009081526002602052604090205473ffffffffffffffffffffffffffffffffffffffff1680610bb257604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f217265706c696361206578697374730000000000000000000000000000000000604482015290519081900360640190fd5b610bbb83611283565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1663df034cd06040518163ffffffff1660e01b815260040160206040518083038186803b158015610c1757600080fd5b505afa158015610c2b573d6000803e3d6000fd5b505050506040513d6020811015610c4157600080fd5b505173ffffffffffffffffffffffffffffffffffffffff1614610cc557604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f2163757272656e74207570646174657200000000000000000000000000000000604482015290519081900360640190fd5b6000610cdb85610cd4846110a8565b86866110c1565b73ffffffffffffffffffffffffffffffffffffffff8116600090815260046020908152604080832063ffffffff8a16845290915290205490915060ff16610d8357604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f2176616c69642077617463686572000000000000000000000000000000000000604482015290519081900360640190fd5b610d8c826111bb565b5050505050565b610d9b6111b7565b73ffffffffffffffffffffffffffffffffffffffff16610db96108b8565b73ffffffffffffffffffffffffffffffffffffffff1614610e3b57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b73ffffffffffffffffffffffffffffffffffffffff8116610ea7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260268152602001806115606026913960400191505060405180910390fd5b6000805460405173ffffffffffffffffffffffffffffffffffffffff808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b610f3c6111b7565b73ffffffffffffffffffffffffffffffffffffffff16610f5a6108b8565b73ffffffffffffffffffffffffffffffffffffffff1614610fdc57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b610fe5826111bb565b73ffffffffffffffffffffffffffffffffffffffff8216600081815260016020908152604080832080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000001663ffffffff8716908117909155808452600283529281902080547fffffffffffffffffffffffff0000000000000000000000000000000000000000168517905580519384525191927f8440df9bf8a8542634a9eb196da1735b786ed9aa2fc12b080ac34c5fa81a9234929081900390910190a25050565b73ffffffffffffffffffffffffffffffffffffffff1690565b6000806110cd85611283565b73ffffffffffffffffffffffffffffffffffffffff166345630b1a6040518163ffffffff1660e01b815260040160206040518083038186803b15801561111257600080fd5b505afa158015611126573d6000803e3d6000fd5b505050506040513d602081101561113c57600080fd5b50516040805160208181018490527fffffffff0000000000000000000000000000000000000000000000000000000060e08b901b1682840152604480830189905283518084039091018152606490920190925280519101209091506111a081611286565b90506111ac81856112d7565b979650505050505050565b3390565b73ffffffffffffffffffffffffffffffffffffffff81166000818152600160208181526040808420805463ffffffff168086526002845282862080547fffffffffffffffffffffffff00000000000000000000000000000000000000001690559486905292825282547fffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000001690925581519384529051919283927fce1533133fb359ace801d3176bbad25ace030d714aed35e38a6293c8a60b115b929181900390910190a25050565b90565b604080517f19457468657265756d205369676e6564204d6573736167653a0a333200000000602080830191909152603c8083019490945282518083039094018452605c909101909152815191012090565b6000815160411461134957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e67746800604482015290519081900360640190fd5b60208201516040830151606084015160001a61136786828585611371565b9695505050505050565b60007f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08211156113ec576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001806115866022913960400191505060405180910390fd5b8360ff16601b148061140157508360ff16601c145b611456576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001806115a86022913960400191505060405180910390fd5b600060018686868660405160008152602001604052604051808581526020018460ff1681526020018381526020018281526020019450505050506020604051602081039080840390855afa1580156114b2573d6000803e3d6000fd5b50506040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0015191505073ffffffffffffffffffffffffffffffffffffffff811661054657604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f45434453413a20696e76616c6964207369676e61747572650000000000000000604482015290519081900360640190fdfe4f776e61626c653a206e6577206f776e657220697320746865207a65726f206164647265737345434453413a20696e76616c6964207369676e6174757265202773272076616c756545434453413a20696e76616c6964207369676e6174757265202776272076616c7565a2646970667358221220ff92e412482539da78bc88ae82dff65b5dca0e3319191b008f0f3fb14997eed864736f6c63430007060033";

export class TestXAppConnectionManager__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TestXAppConnectionManager> {
    return super.deploy(overrides || {}) as Promise<TestXAppConnectionManager>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TestXAppConnectionManager {
    return super.attach(address) as TestXAppConnectionManager;
  }
  connect(signer: Signer): TestXAppConnectionManager__factory {
    return super.connect(signer) as TestXAppConnectionManager__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestXAppConnectionManagerInterface {
    return new utils.Interface(_abi) as TestXAppConnectionManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestXAppConnectionManager {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as TestXAppConnectionManager;
  }
}
