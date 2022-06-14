import styles from './UpNavBar.module.css'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { IconButton, InputBase, Toolbar, Typography, Tabs, Tab, Paper, Button } from '@mui/material';
import { AccountBalanceWalletOutlined, AccountCircleOutlined, Search, Menu } from '@mui/icons-material';
import { blueGrey } from '@mui/material/colors';
import { Box } from '@mui/system';
import styled from '@emotion/styled';

import RightDrawer from './RightDrawer';
import { useNavigate, Link } from 'react-router-dom';


export default function OpenSeaAppBar() {

    const [tabVal, setTabVal] = React.useState();
    const handleTabOnChange = (event, newVal) =>{
        setTabVal(newVal);
    }

    const navigate = useNavigate();

    return (
        <AppBar sx={{ backgroundColor: `white`, boxShadow: 2 }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Button  onClick={()=>{navigate("/")}}>                   
                        <Box component='img' src='https://static.opensea.io/Logos/opensea-pride.svg' sx={{ height: '40px' }}></Box>
                        <Typography variant="h6" component="div" color='black'>OpenSea</Typography>                    
                </Button>

                <Paper
                    id={styles.shadowPaper}
                    component="form"
                    elevation={0}
                    variant="outlined"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', minWidth: '35vw', maxWidth: '80vw', ml: 2 }}>
                    <Search />
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder='Search items, collections, and accounts'
                    />
                </Paper>

                <Box sx={{ display: 'flex' }}>
                    <Tabs value={tabVal}  sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Tab label="Explore" onClick={()=>{ setTabVal('explore'); navigate('/explore'); }} value='explore'></Tab>
                        <Tab label="Stats" onClick={()=>{ setTabVal('stats'); navigate('/stats'); }} value='stats'></Tab>
                        <Tab label="Resources"></Tab>
                        <Tab label="Create"></Tab>

                    </Tabs>

                    <IconButton sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <AccountCircleOutlined sx={{ color: blueGrey[500] }} />
                    </IconButton>
                    <RightDrawer statusImage={AccountBalanceWalletOutlined} customSx={{ display: { xs: 'none', md: 'flex' } }} customTop={{ top: '64px' }} />
                    <IconButton sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <Menu sx={{ color: blueGrey[500] }} />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}



