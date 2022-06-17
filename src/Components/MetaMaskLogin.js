import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
//css
import styles from './MetaMaskLogin.module.css';

const MetaMaskLogin = (props) => {
    let isLogined = props.isLogined ?? false;
    // const [isMetaMask, setIsMetaMask] = useState(false);
    // const [account, setAccount] = useState('');


    // const handleAccountsChanged = (accounts)=>{
    //     // console.log("acc changed", accounts)
    //     if(accounts.length === 0){
    //         setAccount('');
    //     }
    //     else if(accounts[0] !== account){
    //         setAccount(accounts[0]);
    //     }
    // }

    // useEffect(() => {
    //     const { ethereum } = window;
    //     if (ethereum && ethereum.isMetaMask) {
    //         setIsMetaMask(true);
    //         ethereum.on('accountsChanged',handleAccountsChanged)
    //         ethereum.request({method: 'eth_accounts'}).then(accounts=>{ if(accounts.length>0) {setAccount(accounts[0]); }})           
    //     }
    // }, [])

    const onClickConnect = async () => {
        if(!isLogined){ 
            try {
                const { ethereum } = window;
                const account = await ethereum.request({ method: 'eth_requestAccounts' }); 
                if(account.length > 0) { isLogined=account[0]; console.log('accountLen')}
                
            } catch(err) {console.error(err); }
        }
        // else { if(cb) {cb(account)} }
    }

    

    return (
        <>
            <Button variant="text" onClick={onClickConnect} className={`${styles.changeFont} w3-button w3-block`}  >
                MetaMask
                {/* {
                    isMetaMask ?  (account==='' ? '지갑연결' : account)  : '메타마스크를 설치해야합니다'
                } */}
            </Button>
            {/* <button onClick={()=>{console.log(account)}}>Hi</button> */}
        </>
    )
}

export default MetaMaskLogin;