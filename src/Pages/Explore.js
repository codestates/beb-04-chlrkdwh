import { Grid, Toolbar, IconButton, FormControl, Select, MenuItem, ToggleButton, 
  ToggleButtonGroup, Stack, Pagination, InputLabel } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FilterList, GridOn, Window } from '@mui/icons-material';
import { Box } from '@mui/system';
import NFTCard from '../Components/NFTCard';
import ExploreDrawer from '../Components/ExploreDrawer';
import ExploreModal from '../Components/ExploreModal';
import Loading from '../Components/Loading';

export default function Explore() {
  const [nfts, setNfts] = useState([]);
  const [listing, setListing] = useState('');
  const [window, setWindow] = useState('small');
  const [page, setPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    callNFTs();
  }, [listing, page, ])
  
  const callNFTs = () => {
    let options = {};
    if(listing === ''){
      options = {
        method: 'GET',
        url: `https://testnets-api.opensea.io/api/v1/assets?order_direction=desc&offset=${(page - 1)*20}&limit=20&include_orders=true`
      };
    }
    else if(listing === 'recentSale'){
      options = {
        method: 'GET',
        url: `https://testnets-api.opensea.io/api/v1/assets?order_by=sale_date&order_direction=desc&offset=${(page - 1)*20}&limit=20&include_orders=true`
      };
    }else if(listing === 'saleCount'){
      options = {
        method: 'GET',
        url: `https://testnets-api.opensea.io/api/v1/assets?order_by=sale_count&order_direction=desc&offset=${(page - 1)*20}&limit=20&include_orders=true`
      };
    }else if(listing === 'highLastSale'){
      options = {
        method: 'GET',
        url: `https://testnets-api.opensea.io/api/v1/assets?order_by=sale_price&order_direction=desc&offset=${(page - 1)*20}&limit=20&include_orders=true`
      };
    }else if(listing === 'lowLastSale'){
      options = {
        method: 'GET',
        url: `https://testnets-api.opensea.io/api/v1/assets?order_by=sale_price&order_direction=asc&offset=${(page - 1)*20}&limit=20&include_orders=true`
      };
    }else if(listing === 'oldest'){
      options = {
        method: 'GET',
        url: `https://testnets-api.opensea.io/api/v1/assets?order_by=sale_date&order_direction=asc&offset=${(page - 1)*20}&limit=20&include_orders=true`
      };
    }else{
      return;
    }
    setIsLoading(true);
    axios.request(options)
      .then((res) => {
        console.log(res.data)
        setNfts(res.data.assets)
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      })
  }

  const handleSelect = (e) => {
    setPage(1);
    setListing(e.target.value)
  }

  const handleWindow = (e, newWindow) => {
    setWindow(newWindow)
  }
  
  const handlePage = (e, value)  => {
    setPage(value)
  }

  const toggleDrawer = (open) => (e) => {
    if(e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')){
      return;
    }
    setIsDrawerOpen(open);
  }

  const handleModal = (open, key) => {
    setIsModalOpen(open);
    if(open){
      setModalData(nfts.slice(key, key+1))
    }else{
      setModalData([]);
    }
  }
  
  return (
    <div>
        <Toolbar variant='dense' sx={{my:2}}>
          <IconButton onClick={toggleDrawer(true)} >
            <FilterList size='large'/>
          </IconButton>
          <Box sx={{flexGrow:1}} />
          <Box sx={{display: {xs: 'none', md: 'flex'}}} >
            <FormControl sx={{m:1, minWidth: 120}}>
            <InputLabel id="demo-simple-select-label">Sortby</InputLabel>
              <Select value={listing} onChange={handleSelect} label="Sortby">
                <MenuItem value='recentSale'>Recently Sale</MenuItem>
                <MenuItem value='saleCount'>Sale Count</MenuItem>
                <MenuItem value='highLastSale'>Highest Last Sale</MenuItem>
                <MenuItem value='lowLastSale'>Lowest Last Sale</MenuItem>
                <MenuItem value='oldest'>Oldest Sale</MenuItem>
              </Select>
            </FormControl>
            <ToggleButtonGroup value={window} exclusive onChange={handleWindow}>
              <ToggleButton value="small">
                <GridOn />
              </ToggleButton>
              <ToggleButton value="window">
                <Window />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Toolbar>
      {isLoading ? <Loading />: ''}
        <Box sx={{display: 'flex'}}>
          <ExploreDrawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}/>
          <Box>
            <Grid container spacing={2} sx={{px:2}}>
              {nfts.map((el, idx) => {
                return <NFTCard key={idx} idx={idx} window={window} collection_name={el.collection_name} name={el.name} image_url={el.image_url} sell_orders={el.sell_orders} last_sale={el.last_sale} handleModal={handleModal}/>
              })}
            </Grid>
              <ExploreModal isModalOpen={isModalOpen} handleModal={handleModal} modalData={modalData}/>
            <Box display='flex' justifyContent='center' alignItems='center' sx={{my:3}}>
              <Stack spacing= {2}>
                <Pagination count={10} variant='outlined' shape='rounded' page={page} onChange={handlePage}/>
              </Stack>
            </Box>
          </Box>
        </Box>
    </div>
  )
}
