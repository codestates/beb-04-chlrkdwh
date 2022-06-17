import * as React from 'react';
import { Tabs, Tab, Box, Grid, Stack, Typography, ButtonBase, Container, Button, Input, IconButton } from '@mui/material';
import { Image } from '@mui/icons-material';
import styled from "@mui/styled-engine";
import { TabContext, TabPanel, TabList } from '@mui/lab';
import { ethers } from 'ethers';
import axios from 'axios';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function ProfileTab(props) {
    const NFTInfo = props.NFTInfo;

    const provider = props.provider;
    const myContract = props.myContract;
    
    const [inputVal, setInputVal] = React.useState('');
    const [price, setPrice] = React.useState('');

    const clickRefreshHandle = ()=>{
        if(window.ethereum){
            
            myContract.tokenIdToPrice(NFTInfo.tokenId).then(bn=>parseInt(bn['_hex'])).then(setPrice);
        }
    }

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      });

    return (
        <>
            <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                        <Img alt={NFTInfo.name} src={NFTInfo.image} />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                {NFTInfo.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                ID: {NFTInfo.tokenId}
                            </Typography>
                        </Grid>
                        <Grid item>

                            <Input
                                value={inputVal}
                                onChange={(e)=>setInputVal(e.target.value)}
                            ></Input><Button onClick={() => { props.handleAllowBuy(inputVal, NFTInfo.tokenId) }}>allowBuy</Button>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={clickRefreshHandle}>
                            <RefreshIcon></RefreshIcon>
                        </IconButton>
                        Price : {price}
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}