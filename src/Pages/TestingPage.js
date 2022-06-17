
import { useEffect, useState } from "react";

import Login from "./Login";
import { ethers } from "ethers";

import contractAbi from "../SmartContract/contractAbi";
import contractAddress from "../SmartContract/contractAddress";


export default function TestingPage(props) {

    const [totalNumOfNFT, setTotalNumOfNFT] = useState(0);
    // const ethereum = window.ethereum ?? false;

    // if (window.ethereum) {
    //     const provider = new ethers.providers.Web3Provider(window.ethereum);
    //     const myContract = new ethers.Contract(contractAddress, contractAbi, provider);
    // }
    // const myContractWithSigner = await provider.send("eth_requestAccounts", []).then( _=>provider.getSigner()).then(signer=>myContract.connect(signer));

    // myContractWithSigner.functions.mintNFT(ethereum.selectedAddress, submitImage(inputs));
    // myContract.name().then(console.log);

    useEffect(() => {
        (async () => {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const myContract = new ethers.Contract(contractAddress, contractAbi, provider);

                myContract.totalSupply().then(ret => setTotalNumOfNFT(ret['_hex'])); //.then(console.log)

                // const myContractWithSigner = await provider.send("eth_requestAccounts", []).then(_ => provider.getSigner()).then(signer => myContract.connect(signer));
                // myContractWithSigner.functions.mintNFT(ethereum.selectedAddress, submitImage(inputs));
                // myContract.name().then(console.log);
            }
        })();


    }, [])




    return (
        <>
            {props['isLogined'] ? <div>{totalNumOfNFT}</div> : <Login />}
        </>
    )
}