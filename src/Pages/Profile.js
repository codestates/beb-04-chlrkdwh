import * as React from 'react';
import {Tabs, Tab, Box, Grid, Stack, Paper, Typography, ButtonBase, Container} from '@mui/material';
import styled from "@mui/styled-engine";
import {TabContext,TabPanel,TabList} from '@mui/lab';
// import { account } from "Components/MetaMaskLogin"


const Profile = (props) => {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const StyledTab = styled(Tab)`
  && {
    color: gray;
    font-size: 0.8rem;
    font-weight: 800;
    indicatorColor:"black";
    transition : black;
  }
`;
  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

  return (
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
            address
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
            <StyledTab value="one" label="Collected" />
            <StyledTab value="two" label="Created" />
            {/* <StyledTab value="three" label="Favorited" />
            <StyledTab value="four" label="Activity" /> */}
          </TabList>
        </Tabs>
        <TabPanel value="one">
        <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src="https://lh3.googleusercontent.com/Px0LbKE9SZgOc-6vjzwPKopVMt7IRhk_lfmnAmbu9fGGetpL0RsvzHFwd0Td5Xpdh2kEqn6gz4Fanfn6cF5NGPesNc2loqRBye1SlQ=w407" />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Standard license
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: 1030114
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
              $19.00
            </Typography>
          </Grid>
        </Grid>
      </Grid>
        </TabPanel>
        <TabPanel value="two"><Grid container spacing={2}>
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
      </TabPanel>
        {/* <TabPanel value="three">Item Three</TabPanel> */}
      </TabContext> 
    </Box>
  </div> 
  );
}

export default Profile;
