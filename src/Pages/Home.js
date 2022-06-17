import React, { useEffect, useState } from 'react'
import { Button, Stack, Typography, Box, Grid, CardMedia, Card } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const [imgUrl, setImgUrl] = useState('');
  useEffect(()=> {
    callImage();
  },[])
  const callImage = () => {
    const options = {
      method: 'GET',
      url: 'https://testnets-api.opensea.io/api/v1/assets?order_by=sale_date&order_direction=desc&offset=0&limit=1&include_orders=false'
    }
    axios.request(options)
      .then((res) => {
        setImgUrl(res.data.assets[0].image_url)
      })
      .catch((e) =>  console.error(e))
  }

  const navigate = useNavigate();

  return (
    <div className='home' >
      <Box style={{height: '500px', marginBottom: '20px'}}>
        <div style={{filter:'blur(20px)', opacity:'20%'}}>
          <img src={imgUrl} style={{width: '95vw', height: '99vh', objectFit: 'cover'}}></img>
        </div>
        <Grid container justifyContent="center" spacing={2} gap={5} mt={5} style={{zIndex: '2', position: 'absolute', top: '20%', left:'0%'}}>
          <Grid item xs={10} md={5}>
            <Typography variant='h4' component='div' gutterBottom>
            Discover, collect, and 
            sell extraordinary NFTs
            </Typography>
            <Typography variant='h6' component='div' gutterBottom mb={2}>
            OpenSea is the world's first and largest NFT marketplace
            </Typography>
            <Stack direction='row' spacing={2} justifyContent='start' >
              <Button variant='contained' onClick={()=>{navigate('/explore', )}}>Explore</Button>
              <Button variant='contained' onClick={()=>{navigate('/create', )}}>Create</Button>
            </Stack>
            <Typography variant='h6' component='div' mt={2}>
            Learn more about OpenSea
            </Typography>
          </Grid>
          <Grid item xs={10} md={5} spacing={2}>
            <Box display='flex' justifyContent='center' alignItems='center'>
              <Card sx={{maxWidth:'400px'}}>
                <CardMedia 
                  component='img'
                  image={imgUrl}
                  sx={{minHeight:'200px'}}
                />
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>

    </div>
  )
}
