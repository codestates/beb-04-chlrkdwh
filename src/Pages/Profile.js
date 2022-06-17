import * as React from 'react';
import { Tabs, Tab, Box, Grid, Stack, Typography, ButtonBase, Container, Button, Input } from '@mui/material';
import styled from "@mui/styled-engine";
import { TabContext, TabPanel, TabList } from '@mui/lab';
import { ethers } from 'ethers';
import axios from 'axios';

import contractAbi from '../SmartContract/contractAbi';
import contractAddress from '../SmartContract/contractAddress';
import ProfileTab from '../Components/ProfileTab';
import Login from './Login';



const Profile = (props) => {
  const isLogined = props.isLogined;

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const myContract = new ethers.Contract(contractAddress, contractAbi, provider);

  // const [totalNumOfNFT, setTotalNumOfNFT] = React.useState(0);
  const [NFTInfos, setNFTInfos] = React.useState([]);
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAllowBuy = async (inputVal, tokenId) => {
    console.log(inputVal, tokenId)
    const myContractWithSigner = await provider.send("eth_requestAccounts", []).then(_ => provider.getSigner()).then(signer => myContract.connect(signer));
    myContractWithSigner.functions.allowBuy(tokenId, inputVal);

  }

  async function handleOnChangeWallet (){
    if (window.ethereum && isLogined !== false) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const myContract = new ethers.Contract(contractAddress, contractAbi, provider);
      // await myContract.totalSupply().then(ret => setTotalNumOfNFT(parseInt(ret['_hex']))); //.then(console.log)

      // const retArr = Array(totalNumOfNFT).fill(false);
      // for (let i = 0; i < totalNumOfNFT; i++) {
      //   (myContract.tokenOfOwnerByIndex(window.ethereum.selectedAddress, i))
      // }
      // retArr.map((e,idx)=>{return myContract.tokenOfOwnerByIndex(window.ethereum.selectedAddress, idx)});
      const retArr = [];

      let idx = 0;

      try {
        while (1) {
          let tmp = await myContract.tokenOfOwnerByIndex(window.ethereum.selectedAddress, idx);
          retArr.push(parseInt(tmp['_hex']));
          idx++;
        }
      }
      catch (err) {
        console.log(err);
      }

      console.log(retArr);
      Promise.all(retArr.map(tokenid => myContract.tokenURI(tokenid)))
        .then(arrs => {
          console.log("arrs", arrs);
          return Promise.all(arrs.map(imgurl => {
            return axios({
              url: imgurl,
              method: 'get'
            }).then(obj => obj.data)
          }))
        })
        .then(metadataInfos => {
          retArr.forEach((tokenid, idx) => {
            metadataInfos[idx].tokenId = tokenid;
          })
          return metadataInfos;
        })
        .then(setNFTInfos);


      // idx++;



      // setGridInfoArr(retArr);
      // console.log(retArr);
      // const myContractWithSigner = await provider.send("eth_requestAccounts", []).then(_ => provider.getSigner()).then(signer => myContract.connect(signer));
      // myContractWithSigner.functions.mintNFT(ethereum.selectedAddress, submitImage(inputs));
      // myContract.name().then(console.log);
    }
  };


  React.useEffect(() => {
    handleOnChangeWallet();
    if(window.ethereum){
      window.ethereum.on('accountsChanged',handleOnChangeWallet);
    }

    return ()=>{
      if(window.ethereum){
        window.ethereum.removeListener('accountsChanged',handleOnChangeWallet);
      }
    }

  }, []);



  const StyledTab = styled(Tab)`
  && {
    color: gray;
    font-size: 0.8rem;
    font-weight: 800;
    indicatorColor="black"
    transition : black;
  }
`;
  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

  return <>{ 
    
    isLogined ? 
    
    <div>
      <Grid backgroundColor="yellowgreen" height="200px" width="600px"></Grid>
      <Typography variant='h5' component='div' gutterBottom>
        Unnamed
      </Typography>
      <Stack direction='row' spacing={2} >
        <ButtonBase sx={{ width: 20, height: 20 }}>
          <Img alt="complex" src="https://static.opensea.io/general/ETH.svg" />
        </ButtonBase>
        <Typography variant='body1' component='div' gutterBottom>
          {/* {`${isLogined.slice(0, 6)}...${isLogined.slice(-4)}`} */}
        </Typography>
      </Stack>
      <Box sx={{ width: '100%' }}>
        <Container minwidth="30%">

        </Container>
        <TabContext value={value}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="lab API tabs example"
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <StyledTab value="one" label="MyNFT" />
              <StyledTab value="two" label="Comming Soon" disabled={true} sx={{ color: 'wheat !important' }} />
              {/* <StyledTab value="three" label="Favorited" />
            <StyledTab value="four" label="Activity" /> */}
            </TabList>
          </Tabs>
          <TabPanel value="one">
            {
              NFTInfos.map(NFTInfo => {
                return <ProfileTab NFTInfo={NFTInfo} handleAllowBuy={handleAllowBuy} provider={provider} myContract={myContract} ></ProfileTab>
              })
            }

            <div style={{ display: 'flex', justifyContent: 'center' }}><div>total : {parseInt(NFTInfos.length)}</div></div>
          </TabPanel>


          {/* <TabPanel value="two">
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase sx={{ width: 128, height: 128 }}>
                  <Img alt="complex" src="https://lh3.googleusercontent.com/ctX9LggSyr8uTaaHz0PNTUh5qKbU4lkJYwmGewpLXM56jgILwFYnWI45VJWC13tghKJxInlRTNBYyRM5knGzbND9xswtlAFIXG_VCw=w407" />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1" component="div">
                      Standard license
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ID: 1047644
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ cursor: 'pointer' }} variant="body2">
                      Remove
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" component="div">
                    $15.00
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </TabPanel> */}
          {/* <TabPanel value="three">Item Three</TabPanel> */}
        </TabContext>
      </Box>
    </div >
    
    :
    <Login/>
    }</>;
}

export default Profile;