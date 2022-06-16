import styles from './UpNavBar.module.css'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { IconButton, InputBase, Toolbar, Typography, Tabs, Tab, Paper } from '@mui/material';
import { AccountBalanceWalletOutlined, AccountCircleOutlined, Search, Menu } from '@mui/icons-material';
import { blueGrey } from '@mui/material/colors';
import { Box } from '@mui/system';
import styled from '@emotion/styled';

import RightDrawer from './RightDrawer';
import zIndex from '@mui/material/styles/zIndex';


export default function OpenSeaAppBar() {

    // const whiteAppBar = styled(AppBar, {
    //     fontFamily: ['Poppins', 'sans-serif'],
    //     color: 'white',
    // })

    const [search, setSearch] = React.useState('');
    const handleSearch = (e) => {
        console.log(e.target.value)
        setSearch(e.target.value)
    }



    return (
        <AppBar sx={{ backgroundColor: `white`, boxShadow: 2 }}>
            <Toolbar sx={{justifyContent:'space-between'}}>
                <div className={styles.flexDiv}>
                <Box component='img' src='https://static.opensea.io/Logos/opensea-pride.svg' sx={{ height: '40px' }}></Box>
                <Typography variant="h5" component="div" color='black'>OpenSea</Typography>
                </div>
                { /* <Icon><img src={openSeaSvg}/></Icon> */}
                <Paper
                    id={styles.shadowPaper}
                    component="form"
                    elevation={0}
                    variant="outlined"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', minWidth: '35vw', maxWidth: '80vw', ml: 2 }}
                    onChange={handleSearch}
                    >
                    <Search />
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder='Search items, collections, and accounts'
                    />
                </Paper>
                {/* <Box sx={{borderBottom:1, borderColor:'divider'}}> */}
                <Box sx={{display:'flex'}}>
                    <Tabs sx={{display:{xs:'none' ,md: 'flex'}}}>
                        <Tab label="Explore"></Tab>
                        <Tab label="Stats"></Tab>
                        <Tab label="Resources"></Tab>
                        <Tab label="Create"></Tab>
                        {/* <Tab><Typography fontFamily='Poppins' variant="h6" component="div" sx={{ ml: 2, mr: 2 }}>Stats</Typography></Tab>
                    <Tab><Typography fontFamily='Poppins' variant="h6" component="div" sx={{ ml: 2, mr: 2 }}>Resources</Typography></Tab>
                <Tab><Typography fontFamily='Poppins' variant="h6" component="div" sx={{ ml: 2, mr: 2 }}>Create</Typography></Tab> */}
                    </Tabs>
                    {/* </Box> */}
                    <IconButton sx={{ display:{ xs:'none', md: 'flex' } }}>
                        <AccountCircleOutlined sx={{ color: blueGrey[500]}} />
                    </IconButton>
                    <RightDrawer statusImage={AccountBalanceWalletOutlined} customSx={{ display:{ xs:'none', md: 'flex' } }}  customTop={{top:'64px'}}  />
                    <IconButton sx={{ display:{ xs:'flex' ,md: 'none' } }}>
                        <Menu sx={{ color: blueGrey[500] }} />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}



