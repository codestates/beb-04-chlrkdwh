import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { AccountCircle } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';

// import local
import styles from './RightDrawer.module.css'
import ConnectWallet from './ConnectWallet';
import MetaMaskLogin from './MetaMaskLogin';



export default function RightDrawer(props) {
  const anchor = 'right';
  const [state, setState] = React.useState({ right: false });
  const [isLogined, setLogined] = React.useState(false);
  

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 418 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}

    >
      <List sx={props.customTop}>
        <div class={styles.rowDiv}><AccountCircle></AccountCircle><Typography component="div" color='black' variant='h6'>My wallet</Typography></div>
        {isLogined ? <></> : <></>}   // 로그인 이후 주소 띄우는 곳
        <Divider />
        <div class={styles.rowDiv}><Typography component="div" color='black' variant='h7'>Connect with one of our available wallet providers or create a new one.</Typography></div>
        {isLogined ? <></>: <ConnectWallet metaMask={MetaMaskLogin} />}   // 로그인 이후 (total balance 보여주기) : 로그인 이전 (연결 지갑 보여주기)
        {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))} */}
      </List>
    </Box>
  );

  return (
    <>
      
        <React.Fragment key={anchor}>
          <IconButton onClick={()=>{setState({...state, [anchor]: !state[anchor]})}} sx={props.customSx}>
            <props.statusImage></props.statusImage>
          </IconButton>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      
    </>
  );
}
