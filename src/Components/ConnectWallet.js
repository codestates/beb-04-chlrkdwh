import React from 'react';
import { Divider, Paper } from "@mui/material";
// import {  } from "@mui/system";

import styles from './ConnectWallet.module.css'
function ConnectWallet(props) {
    // console.log(props);
    const metaMask = props.metaMask;


    return (
        // <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',  height: '100vh', width:'100vw'}}>
        <div style={{ margin: '15px' }}>
            <div style={{ top: '64px' }}>
                <div>
                    <Paper variant="outlined" sx={{ borderRadius: '16px' }} style={{ height: '100%', width: '100%' }} className={styles.walletContainer}>
                        <div className={styles.walletItem}>{ metaMask({cb:()=>{}}) }</div>
                        <Divider />
                        <div>Coinbase</div>
                        <Divider />
                    </Paper>
                </div>
            </div>
        </div>
    )
}

export default ConnectWallet;