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
import ExploreToolbar from '../Components/ExploreToolbar';

export default function Explore() {
  const [show, setShow] = useState([])
  const [nfts, setNfts] = useState([]);
  const [myNfts, setMyNfts] = useState([]);
  const [ismyNfts, setIsmyNfts] = useState(false);
  const [listing, setListing] = useState('');
  const [window, setWindow] = useState('small');
  const [page, setPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  
  useEffect(() => {
    callNFTs();
    callMyNFTs();
    if(ismyNfts) setShow(...myNfts)
    else setShow(...nfts)
  }, [listing, page, ismyNfts,])
  
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

  const callMyNFTs = () => {
    let options = {};
    if(listing === ''){
      options = {
        method: 'GET',
        url: 'https://testnets-api.opensea.io/api/v1/assets?asset_contract_address=0xC70AA59E111eA446628AC072921c7CB852DFb37c&order_direction=desc&offset=0&limit=50&include_orders=true'
      };
    }else{
      return;
    }
    setIsLoading(true);
    axios.request(options)
      .then((res) => {
        console.log(res.data)
        setMyNfts(res.data.assets)
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      })
  }

  const handleSwitch = () => {
    if(ismyNfts) setIsmyNfts(false);
    else setIsmyNfts(true);
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

  const handleFilter = () => {
    if(isFilter) setIsFilter(false)
    else setIsFilter(true);
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
      <ExploreToolbar handleWindow={handleWindow} handleSelect={handleSelect} toggleDrawer={toggleDrawer} listing={listing} window={window} ismyNfts={ismyNfts} handleSwitch={handleSwitch}/>
      {isLoading ? <Loading />: ''}
        <Box sx={{display: 'flex'}}>
          <ExploreDrawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} isFilter={isFilter} handleFilter={handleFilter} />
          <Box>
            <Grid container spacing={2} sx={{px:2}}>
              {/* nfts, myNfts */}
              {myNfts.map((el, idx) => {
                return <NFTCard key={idx} idx={idx} window={window} collection_name={el.collection_name} name={el.name} image_url={el.image_url} sell_orders={el.sell_orders} last_sale={el.last_sale} handleModal={handleModal} isFilter={isFilter}/>
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
