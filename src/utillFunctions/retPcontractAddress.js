const retContractAdrr = async (txHash, ethereum, delay) =>{ 
    let ret = await ethereum.request({ method: 'eth_getTransactionReceipt', params: [txHash] });
    let count = 0;
    while(count < delay && ret === null){
        await new Promise(res=>setTimeout(()=>{res(count++)},1000));
        ret = await ethereum.request({ method: 'eth_getTransactionReceipt', params: [txHash] });
    
    }
    return ret ?? false;
};

// data : 만들 컨트랙트의 bytecode
// ethProxy : window.ethereum 객체. 메타마스크 설치되어있으면 자동으로 있음.

// return : 컨트랙트의 address를 프로미스의 형태로 반납해줌.
const retPcontractAddress = async (data, ethProxy, delay=20) => {
    const ethereum = ethProxy ?? false;
    if(!ethereum) return false;
    const txHash = await ethereum.request({
        method: 'eth_sendTransaction', params: [{
            from: ethereum.selectedAddress,
            data: data
        }]
    })

    const myReceipt = await retContractAdrr(txHash, ethereum, delay);
    if(myReceipt){
        return myReceipt.contractAddress;
    }
    else return false;
    
    
}

// retPcontractAddress().then(console.log);

export default retPcontractAddress;



// const data = "60806040523480156200001157600080fd5b506040518060400160405280600581526020017f4d794e46540000000000000000000000000000000000000000000000000000008152506040518060400160405280600381526020017f4e46540000000000000000000000000000000000000000000000000000000000815250816000908051906020019062000096929190620001a6565b508060019080519060200190620000af929190620001a6565b505050620000d2620000c6620000d860201b60201c565b620000e060201b60201c565b620002bb565b600033905090565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b828054620001b49062000256565b90600052602060002090601f016020900481019282620001d8576000855562000224565b82601f10620001f357805160ff191683800117855562000224565b8280016001018555821562000224579182015b828111156200022357825182559160200191906001019062000206565b5b50905062000233919062000237565b5090565b5b808211156200025257600081600090555060010162000238565b5090565b600060028204905060018216806200026f57607f821691505b602082108114156200028657620002856200028c565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b61302080620002cb6000396000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c8063715018a6116100a2578063b88d4fde11610071578063b88d4fde146102a4578063c87b56dd146102c0578063e985e9c5146102f0578063eacabe1414610320578063f2fde38b146103505761010b565b8063715018a6146102425780638da5cb5b1461024c57806395d89b411461026a578063a22cb465146102885761010b565b806323b872dd116100de57806323b872dd146101aa57806342842e0e146101c65780636352211e146101e257806370a08231146102125761010b565b806301ffc9a71461011057806306fdde0314610140578063081812fc1461015e578063095ea7b31461018e575b600080fd5b61012a60048036038101906101259190611f80565b61036c565b60405161013791906123d8565b60405180910390f35b61014861044e565b60405161015591906123f3565b60405180910390f35b61017860048036038101906101739190611fda565b6104e0565b6040516101859190612371565b60405180910390f35b6101a860048036038101906101a39190611f40565b610565565b005b6101c460048036038101906101bf9190611dce565b61067d565b005b6101e060048036038101906101db9190611dce565b6106dd565b005b6101fc60048036038101906101f79190611fda565b6106fd565b6040516102099190612371565b60405180910390f35b61022c60048036038101906102279190611d61565b6107af565b6040516102399190612655565b60405180910390f35b61024a610867565b005b6102546108ef565b6040516102619190612371565b60405180910390f35b610272610919565b60405161027f91906123f3565b60405180910390f35b6102a2600480360381019061029d9190611ea4565b6109ab565b005b6102be60048036038101906102b99190611e21565b6109c1565b005b6102da60048036038101906102d59190611fda565b610a23565b6040516102e791906123f3565b60405180910390f35b61030a60048036038101906103059190611d8e565b610b75565b60405161031791906123d8565b60405180910390f35b61033a60048036038101906103359190611ee4565b610c09565b6040516103479190612655565b60405180910390f35b61036a60048036038101906103659190611d61565b610cbd565b005b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061043757507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80610447575061044682610db5565b5b9050919050565b60606000805461045d906128ab565b80601f0160208091040260200160405190810160405280929190818152602001828054610489906128ab565b80156104d65780601f106104ab576101008083540402835291602001916104d6565b820191906000526020600020905b8154815290600101906020018083116104b957829003601f168201915b5050505050905090565b60006104eb82610e1f565b61052a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610521906125b5565b60405180910390fd5b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000610570826106fd565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156105e1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105d890612615565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff16610600610e8b565b73ffffffffffffffffffffffffffffffffffffffff16148061062f575061062e81610629610e8b565b610b75565b5b61066e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610665906124f5565b60405180910390fd5b6106788383610e93565b505050565b61068e610688610e8b565b82610f4c565b6106cd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106c490612635565b60405180910390fd5b6106d883838361102a565b505050565b6106f8838383604051806020016040528060008152506109c1565b505050565b6000806002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156107a6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161079d90612535565b60405180910390fd5b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610820576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161081790612515565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b61086f610e8b565b73ffffffffffffffffffffffffffffffffffffffff1661088d6108ef565b73ffffffffffffffffffffffffffffffffffffffff16146108e3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108da906125d5565b60405180910390fd5b6108ed6000611291565b565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b606060018054610928906128ab565b80601f0160208091040260200160405190810160405280929190818152602001828054610954906128ab565b80156109a15780601f10610976576101008083540402835291602001916109a1565b820191906000526020600020905b81548152906001019060200180831161098457829003601f168201915b5050505050905090565b6109bd6109b6610e8b565b8383611357565b5050565b6109d26109cc610e8b565b83610f4c565b610a11576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a0890612635565b60405180910390fd5b610a1d848484846114c4565b50505050565b6060610a2e82610e1f565b610a6d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a6490612595565b60405180910390fd5b6000600660008481526020019081526020016000208054610a8d906128ab565b80601f0160208091040260200160405190810160405280929190818152602001828054610ab9906128ab565b8015610b065780601f10610adb57610100808354040283529160200191610b06565b820191906000526020600020905b815481529060010190602001808311610ae957829003601f168201915b505050505090506000610b17611520565b9050600081511415610b2d578192505050610b70565b600082511115610b62578082604051602001610b4a92919061234d565b60405160208183030381529060405292505050610b70565b610b6b84611537565b925050505b919050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6000610c13610e8b565b73ffffffffffffffffffffffffffffffffffffffff16610c316108ef565b73ffffffffffffffffffffffffffffffffffffffff1614610c87576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c7e906125d5565b60405180910390fd5b610c9160086115de565b6000610c9d60086115f4565b9050610ca98482611602565b610cb381846117dc565b8091505092915050565b610cc5610e8b565b73ffffffffffffffffffffffffffffffffffffffff16610ce36108ef565b73ffffffffffffffffffffffffffffffffffffffff1614610d39576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d30906125d5565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610da9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610da090612435565b60405180910390fd5b610db281611291565b50565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b60008073ffffffffffffffffffffffffffffffffffffffff166002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614159050919050565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16610f06836106fd565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000610f5782610e1f565b610f96576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f8d906124d5565b60405180910390fd5b6000610fa1836106fd565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480610fe35750610fe28185610b75565b5b8061102157508373ffffffffffffffffffffffffffffffffffffffff16611009846104e0565b73ffffffffffffffffffffffffffffffffffffffff16145b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff1661104a826106fd565b73ffffffffffffffffffffffffffffffffffffffff16146110a0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161109790612455565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611110576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161110790612495565b60405180910390fd5b61111b838383611850565b611126600082610e93565b6001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461117691906127c1565b925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546111cd919061273a565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a461128c838383611855565b505050565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156113c6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113bd906124b5565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31836040516114b791906123d8565b60405180910390a3505050565b6114cf84848461102a565b6114db8484848461185a565b61151a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161151190612415565b60405180910390fd5b50505050565b606060405180602001604052806000815250905090565b606061154282610e1f565b611581576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611578906125f5565b60405180910390fd5b600061158b611520565b905060008151116115ab57604051806020016040528060008152506115d6565b806115b5846119f1565b6040516020016115c692919061234d565b6040516020818303038152906040525b915050919050565b6001816000016000828254019250508190555050565b600081600001549050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611672576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161166990612575565b60405180910390fd5b61167b81610e1f565b156116bb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116b290612475565b60405180910390fd5b6116c760008383611850565b6001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611717919061273a565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a46117d860008383611855565b5050565b6117e582610e1f565b611824576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161181b90612555565b60405180910390fd5b8060066000848152602001908152602001600020908051906020019061184b929190611b75565b505050565b505050565b505050565b600061187b8473ffffffffffffffffffffffffffffffffffffffff16611b52565b156119e4578373ffffffffffffffffffffffffffffffffffffffff1663150b7a026118a4610e8b565b8786866040518563ffffffff1660e01b81526004016118c6949392919061238c565b602060405180830381600087803b1580156118e057600080fd5b505af192505050801561191157506040513d601f19601f8201168201806040525081019061190e9190611fad565b60015b611994573d8060008114611941576040519150601f19603f3d011682016040523d82523d6000602084013e611946565b606091505b5060008151141561198c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161198390612415565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149150506119e9565b600190505b949350505050565b60606000821415611a39576040518060400160405280600181526020017f30000000000000000000000000000000000000000000000000000000000000008152509050611b4d565b600082905060005b60008214611a6b578080611a549061290e565b915050600a82611a649190612790565b9150611a41565b60008167ffffffffffffffff811115611a8757611a86612a44565b5b6040519080825280601f01601f191660200182016040528015611ab95781602001600182028036833780820191505090505b5090505b60008514611b4657600182611ad291906127c1565b9150600a85611ae19190612957565b6030611aed919061273a565b60f81b818381518110611b0357611b02612a15565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a85611b3f9190612790565b9450611abd565b8093505050505b919050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b828054611b81906128ab565b90600052602060002090601f016020900481019282611ba35760008555611bea565b82601f10611bbc57805160ff1916838001178555611bea565b82800160010185558215611bea579182015b82811115611be9578251825591602001919060010190611bce565b5b509050611bf79190611bfb565b5090565b5b80821115611c14576000816000905550600101611bfc565b5090565b6000611c2b611c2684612695565b612670565b905082815260208101848484011115611c4757611c46612a78565b5b611c52848285612869565b509392505050565b6000611c6d611c68846126c6565b612670565b905082815260208101848484011115611c8957611c88612a78565b5b611c94848285612869565b509392505050565b600081359050611cab81612f8e565b92915050565b600081359050611cc081612fa5565b92915050565b600081359050611cd581612fbc565b92915050565b600081519050611cea81612fbc565b92915050565b600082601f830112611d0557611d04612a73565b5b8135611d15848260208601611c18565b91505092915050565b600082601f830112611d3357611d32612a73565b5b8135611d43848260208601611c5a565b91505092915050565b600081359050611d5b81612fd3565b92915050565b600060208284031215611d7757611d76612a82565b5b6000611d8584828501611c9c565b91505092915050565b60008060408385031215611da557611da4612a82565b5b6000611db385828601611c9c565b9250506020611dc485828601611c9c565b9150509250929050565b600080600060608486031215611de757611de6612a82565b5b6000611df586828701611c9c565b9350506020611e0686828701611c9c565b9250506040611e1786828701611d4c565b9150509250925092565b60008060008060808587031215611e3b57611e3a612a82565b5b6000611e4987828801611c9c565b9450506020611e5a87828801611c9c565b9350506040611e6b87828801611d4c565b925050606085013567ffffffffffffffff811115611e8c57611e8b612a7d565b5b611e9887828801611cf0565b91505092959194509250565b60008060408385031215611ebb57611eba612a82565b5b6000611ec985828601611c9c565b9250506020611eda85828601611cb1565b9150509250929050565b60008060408385031215611efb57611efa612a82565b5b6000611f0985828601611c9c565b925050602083013567ffffffffffffffff811115611f2a57611f29612a7d565b5b611f3685828601611d1e565b9150509250929050565b60008060408385031215611f5757611f56612a82565b5b6000611f6585828601611c9c565b9250506020611f7685828601611d4c565b9150509250929050565b600060208284031215611f9657611f95612a82565b5b6000611fa484828501611cc6565b91505092915050565b600060208284031215611fc357611fc2612a82565b5b6000611fd184828501611cdb565b91505092915050565b600060208284031215611ff057611fef612a82565b5b6000611ffe84828501611d4c565b91505092915050565b612010816127f5565b82525050565b61201f81612807565b82525050565b6000612030826126f7565b61203a818561270d565b935061204a818560208601612878565b61205381612a87565b840191505092915050565b600061206982612702565b612073818561271e565b9350612083818560208601612878565b61208c81612a87565b840191505092915050565b60006120a282612702565b6120ac818561272f565b93506120bc818560208601612878565b80840191505092915050565b60006120d560328361271e565b91506120e082612a98565b604082019050919050565b60006120f860268361271e565b915061210382612ae7565b604082019050919050565b600061211b60258361271e565b915061212682612b36565b604082019050919050565b600061213e601c8361271e565b915061214982612b85565b602082019050919050565b600061216160248361271e565b915061216c82612bae565b604082019050919050565b600061218460198361271e565b915061218f82612bfd565b602082019050919050565b60006121a7602c8361271e565b91506121b282612c26565b604082019050919050565b60006121ca60388361271e565b91506121d582612c75565b604082019050919050565b60006121ed602a8361271e565b91506121f882612cc4565b604082019050919050565b600061221060298361271e565b915061221b82612d13565b604082019050919050565b6000612233602e8361271e565b915061223e82612d62565b604082019050919050565b600061225660208361271e565b915061226182612db1565b602082019050919050565b600061227960318361271e565b915061228482612dda565b604082019050919050565b600061229c602c8361271e565b91506122a782612e29565b604082019050919050565b60006122bf60208361271e565b91506122ca82612e78565b602082019050919050565b60006122e2602f8361271e565b91506122ed82612ea1565b604082019050919050565b600061230560218361271e565b915061231082612ef0565b604082019050919050565b600061232860318361271e565b915061233382612f3f565b604082019050919050565b6123478161285f565b82525050565b60006123598285612097565b91506123658284612097565b91508190509392505050565b60006020820190506123866000830184612007565b92915050565b60006080820190506123a16000830187612007565b6123ae6020830186612007565b6123bb604083018561233e565b81810360608301526123cd8184612025565b905095945050505050565b60006020820190506123ed6000830184612016565b92915050565b6000602082019050818103600083015261240d818461205e565b905092915050565b6000602082019050818103600083015261242e816120c8565b9050919050565b6000602082019050818103600083015261244e816120eb565b9050919050565b6000602082019050818103600083015261246e8161210e565b9050919050565b6000602082019050818103600083015261248e81612131565b9050919050565b600060208201905081810360008301526124ae81612154565b9050919050565b600060208201905081810360008301526124ce81612177565b9050919050565b600060208201905081810360008301526124ee8161219a565b9050919050565b6000602082019050818103600083015261250e816121bd565b9050919050565b6000602082019050818103600083015261252e816121e0565b9050919050565b6000602082019050818103600083015261254e81612203565b9050919050565b6000602082019050818103600083015261256e81612226565b9050919050565b6000602082019050818103600083015261258e81612249565b9050919050565b600060208201905081810360008301526125ae8161226c565b9050919050565b600060208201905081810360008301526125ce8161228f565b9050919050565b600060208201905081810360008301526125ee816122b2565b9050919050565b6000602082019050818103600083015261260e816122d5565b9050919050565b6000602082019050818103600083015261262e816122f8565b9050919050565b6000602082019050818103600083015261264e8161231b565b9050919050565b600060208201905061266a600083018461233e565b92915050565b600061267a61268b565b905061268682826128dd565b919050565b6000604051905090565b600067ffffffffffffffff8211156126b0576126af612a44565b5b6126b982612a87565b9050602081019050919050565b600067ffffffffffffffff8211156126e1576126e0612a44565b5b6126ea82612a87565b9050602081019050919050565b600081519050919050565b600081519050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b60006127458261285f565b91506127508361285f565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561278557612784612988565b5b828201905092915050565b600061279b8261285f565b91506127a68361285f565b9250826127b6576127b56129b7565b5b828204905092915050565b60006127cc8261285f565b91506127d78361285f565b9250828210156127ea576127e9612988565b5b828203905092915050565b60006128008261283f565b9050919050565b60008115159050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b8381101561289657808201518184015260208101905061287b565b838111156128a5576000848401525b50505050565b600060028204905060018216806128c357607f821691505b602082108114156128d7576128d66129e6565b5b50919050565b6128e682612a87565b810181811067ffffffffffffffff8211171561290557612904612a44565b5b80604052505050565b60006129198261285f565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561294c5761294b612988565b5b600182019050919050565b60006129628261285f565b915061296d8361285f565b92508261297d5761297c6129b7565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a207472616e736665722066726f6d20696e636f72726563742060008201527f6f776e6572000000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000600082015250565b7f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a20617070726f766520746f2063616c6c657200000000000000600082015250565b7f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860008201527f697374656e7420746f6b656e0000000000000000000000000000000000000000602082015250565b7f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760008201527f6e6572206e6f7220617070726f76656420666f7220616c6c0000000000000000602082015250565b7f4552433732313a2062616c616e636520717565727920666f7220746865207a6560008201527f726f206164647265737300000000000000000000000000000000000000000000602082015250565b7f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460008201527f656e7420746f6b656e0000000000000000000000000000000000000000000000602082015250565b7f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60008201527f6578697374656e7420746f6b656e000000000000000000000000000000000000602082015250565b7f4552433732313a206d696e7420746f20746865207a65726f2061646472657373600082015250565b7f45524337323155524953746f726167653a2055524920717565727920666f722060008201527f6e6f6e6578697374656e7420746f6b656e000000000000000000000000000000602082015250565b7f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860008201527f697374656e7420746f6b656e0000000000000000000000000000000000000000602082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f4552433732314d657461646174613a2055524920717565727920666f72206e6f60008201527f6e6578697374656e7420746f6b656e0000000000000000000000000000000000602082015250565b7f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60008201527f776e6572206e6f7220617070726f766564000000000000000000000000000000602082015250565b612f97816127f5565b8114612fa257600080fd5b50565b612fae81612807565b8114612fb957600080fd5b50565b612fc581612813565b8114612fd057600080fd5b50565b612fdc8161285f565b8114612fe757600080fd5b5056fea26469706673582212202d67afa83c9fea341bf47e780aee534755986c5914bd9c105dc8d3b190fce0db64736f6c63430008070033"