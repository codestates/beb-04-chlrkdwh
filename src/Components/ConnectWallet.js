import React from 'react';
import { Button, Divider, Paper } from "@mui/material";
import MetaMaskLogin from './MetaMaskLogin';

import styles from './ConnectWallet.module.css'
function ConnectWallet(props) {
    let isLogined = props.isLogined ?? false;
  
    return (
        // <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',  height: '100vh', width:'100vw'}}>
        <div style={{ margin: '15px' }}>
            <div style={{ top: '64px' }}>
                <div>
                    <Paper variant="outlined" sx={{ borderRadius: '12px' }} style={{ height: '100%', width: '100%' }} className={styles.walletContainer}>
                        <div className={styles.walletItem}><MetaMaskLogin isLogined={isLogined}/></div>
                        <Divider />
                        <Button disabled={true}>Coinbase</Button>
                        <Divider />
                        <div className={styles.flexCenter}>Show more options</div>
                    </Paper>
                </div>
            </div>
        </div>
    )
}

export default ConnectWallet;