import styles from './UpNavBar.module.css'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { IconButton, InputBase, Toolbar, Typography, Tabs, Tab, Paper, Button } from '@mui/material';
import { AccountBalanceWalletOutlined, AccountCircleOutlined, Search, Menu } from '@mui/icons-material';
import { blueGrey } from '@mui/material/colors';
import { Box } from '@mui/system';

import RightDrawer from './RightDrawer';
import { useNavigate } from 'react-router-dom';


export default function OpenSeaAppBar(props) {

    const [tabVal, setTabVal] = React.useState(false);
    let isLogined = props.isLogined;            // 기본값은 false, 로그인 됬을 시 account 주소를 넣자.
    const setIsLogined = props.setIsLogined;

    const navigate = useNavigate();

    const  handleClickAccountCircle = ()=>{
         navigate(`/profile`, {state:{isLogined: isLogined}});
         setTabVal(false);
    }


    const handleAccountsChanged = (accounts)=>{
        // console.log("acc changed", accounts)
        if(accounts.length === 0){
            setIsLogined(false);
            // location.reload();
        }
        else if(accounts[0] !== isLogined){
            setIsLogined(accounts[0]);
        }
    }

    React.useEffect(()=>{
        const { ethereum } = window;
        if (ethereum && ethereum.isMetaMask) {
            ethereum.on('accountsChanged',handleAccountsChanged)
            ethereum.request({method: 'eth_accounts'}).then(accounts=>{ if(accounts.length>0) {setIsLogined(accounts[0]); }}) 
        }          
    },[]);


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
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', minWidth: '35vw', maxWidth: '80vw', ml: 2 }}
                    >
                    <Search />
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder='Search items, collections, and accounts'
                    />
                </Paper>

                <Box sx={{ display: 'flex' }}>
                    <Tabs value={tabVal}  sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Tab label="Explore" onClick={()=>{ setTabVal('explore'); navigate('/explore', {state:{isLogined: isLogined}}) }} value='explore'></Tab>
                        <Tab label="Stats" onClick={()=>{ setTabVal('stats'); navigate('/stats'); }} value='stats'></Tab>
                        <Tab label="Resources"></Tab>
                        <Tab label="Create" onClick={()=>{ setTabVal('create'); navigate(`/create`, {state:{isLogined: isLogined}}) }} value='create'></Tab>
                    </Tabs>


                    <IconButton sx={{ display: { xs: 'none', md: 'flex' } }} onClick={handleClickAccountCircle}>
                        <AccountCircleOutlined sx={{ color: blueGrey[500] }} />
                    </IconButton>
                    <RightDrawer isLogined={isLogined} statusImage={AccountBalanceWalletOutlined} customSx={{ display: { xs: 'none', md: 'flex' } }} customTop={{ top: '64px' }} />
                    <IconButton sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <Menu sx={{ color: blueGrey[500] }} />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}



