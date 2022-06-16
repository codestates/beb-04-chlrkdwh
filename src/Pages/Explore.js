import { Grid, Toolbar, IconButton, FormControl, Select, MenuItem, ToggleButton, ToggleButtonGroup, Stack, Pagination, Button} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FilterList, GridOn, Window } from '@mui/icons-material';
import { Box } from '@mui/system';
import NFTCard from '../Components/NFTCard';

export default function Explore() {
  const [nfts, setNfts] = useState([]);
  const [listing, setListing] = useState('recentSale');
  const [window, setWindow] = useState('small');
  const [page, setPage] = useState(1);
  useEffect(() => {
    callNFTs();
  }, [listing, page, ])
  
  const callNFTs = () => {
    let options = {};
    if(listing === 'recentSale'){
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

    axios.request(options)
      .then((res) => {
        // console.log(res.data)
        setNfts(res.data.assets)
      })
      .catch((e) => console.error(e))
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
  

  return (
    <div>
      <div>
        <Toolbar variant='dense' sx={{my:2}}>
          <IconButton >
            <FilterList size='large'/>
          </IconButton>
          <Button>
            change to my NFT contract
          </Button>
            
          
          <Box sx={{flexGrow:1}} />
          <Box sx={{display: {xs: 'none', md: 'flex'}}} >
            <FormControl sx={{m:1, minWidth: 120}}>
              <Select value={listing} onChange={handleSelect} displayEmpty>
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
        <Grid container spacing={2} sx={{px:2}}>
          {nfts.map((el, idx) => {
            return <NFTCard key={idx} window={window} collection_name={el.collection_name} name={el.name} image_url={el.image_url} sell_orders={el.sell_orders} total_price={el.last_sale.total_price} />
          })}
        </Grid>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{my:3}}>
          <Stack spacing= {2}>
            <Pagination count={10} variant='outlined' shape='rounded' page={page} onChange={handlePage}/>
          </Stack>
        </Box>
      </div>
    </div>
  )
}
