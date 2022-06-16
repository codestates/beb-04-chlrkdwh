import React from 'react'
import { Button } from '@mui/material'
import { ethers } from 'ethers';
import contractAbi from '../SmartContract/contractAbi';
import contractAddress from '../SmartContract/contractAddress';


export default function Buy(props) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const myContract = new ethers.Contract(contractAddress, contractAbi, provider);
  
  const buy = async () => {
    if(!props.price) return;
    else{
      try{
        const myContractWithSigner = await provider.send('eth_requestAccounts', []).then( _=> provider.getSigner()).then(signer => myContract.connect(signer))
        const result = await myContractWithSigner.functions.buy(props.token_id, {value: props.price});
        console.log(result)
        alert(result.hash)
      }
      catch(e){
        console.log(e)
      }
    }
  }
  return (
    <Button variant='text' sx={{fontWeight:'bold'}} onClick={buy}>Buy Now</Button>
  )
}
