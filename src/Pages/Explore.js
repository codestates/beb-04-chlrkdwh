import { Grid, Stack, Pagination } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system';
import NFTCard from '../Components/NFTCard';
import ExploreDrawer from '../Components/ExploreDrawer';
import ExploreModal from '../Components/ExploreModal';
import Loading from '../Components/Loading';
import ExploreToolbar from '../Components/ExploreToolbar';
import contractAddress from '../SmartContract/contractAddress';
import contractAbi from '../SmartContract/contractAbi';
import { ethers } from 'ethers';


export default function Explore(props) {
  
  const [nfts, setNfts] = useState([]);
  const [myNfts, setMyNfts] = useState([]);
  const [ismyNfts, setIsmyNfts] = useState(false);
  const [listing, setListing] = useState('');
  const [viewing, setViewing] = useState('small');
  const [page, setPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilter, setIsFilter] = useState(false);

  useEffect(() => {
    callNFTs();
    callMyNFTs();
  }, [listing, page, ismyNfts,])

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const myContract = new ethers.Contract(contractAddress, contractAbi, provider);
    
    
  const callNFTs = async () => {
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
    try{
      const res = await axios.request(options);
      console.log(res.data.assets)
      let dataWithPrice = [];
      for (let el of res.data.assets) {
        
        dataWithPrice.push({...el, price:undefined})
      }
      console.log(dataWithPrice)
      setNfts(dataWithPrice)
      setIsLoading(false);
    }
    catch(e){
      console.log(e)
      setIsLoading(false);
    }
  }

  const callMyNFTs = async() => {
    
    let options = {};
    if(listing === ''){
      //listing, pagination 구현 안된 상태
      options = {
        method: 'GET',
        url: `https://testnets-api.opensea.io/api/v1/assets?asset_contract_address=${contractAddress}&order_direction=desc&offset=0&limit=50&include_orders=true`
      };
    }else{
      return;
    }
    setIsLoading(true);
    try{
      const res = await axios.request(options);
      let dataWithPrice = [];
      for (let el of res.data.assets) {
        let price = await myContract.tokenIdToPrice(el.token_id)
        dataWithPrice.push({...el, price:price.toNumber()})
      }
      console.log(dataWithPrice)
      setMyNfts(dataWithPrice)
      setIsLoading(false);
    }
    catch(e){
      console.log(e)
      setIsLoading(false);
    }
  }

  const handleSwitch = () => {
    console.log(myNfts)
    if(ismyNfts) setIsmyNfts(false);
    else setIsmyNfts(true)
  }

  const handleSelect = (e) => {
    setPage(1);
    setListing(e.target.value)
  }

  const handleViewing = (e, newviewing) => {
    if(viewing === 'small') setViewing('big')
    else setViewing('small')
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
      if(ismyNfts) setModalData(myNfts.slice(key, key+1))
      else setModalData(nfts.slice(key, key+1))
    }else{
      setModalData([]);
    }
  }

  
  return (
    <div style={{width:'100%'}}>
      <ExploreToolbar handleViewing={handleViewing} handleSelect={handleSelect} toggleDrawer={toggleDrawer} listing={listing} viewing={viewing} ismyNfts={ismyNfts} handleSwitch={handleSwitch}/>
      {isLoading ? <Loading />: ''}
      <Box sx={{display: 'flex', justifyContent:'center', alignItems:'center', width:'100%'}}>
        <ExploreDrawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} isFilter={isFilter} handleFilter={handleFilter} />
        <Box sx={{width:'100%'}}>
          <Grid container spacing={2} sx={{px:2}}>
            {ismyNfts ? myNfts.map((el, idx) => {
              return <NFTCard key={idx} idx={idx} viewing={viewing} collection_name={el.collection_name} name={el.name} image_url={el.image_url} sell_orders={el.sell_orders} last_sale={el.last_sale} handleModal={handleModal} isFilter={isFilter} price={el.price} token_id={el.token_id}/>
            }): nfts.map((el, idx) => {
              return <NFTCard key={idx} idx={idx} viewing={viewing} collection_name={el.collection_name} name={el.name} image_url={el.image_url} sell_orders={el.sell_orders} last_sale={el.last_sale} handleModal={handleModal} isFilter={isFilter} price={el.price} token_id={el.token_id}/>
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
