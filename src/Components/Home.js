import React, { useEffect, useState } from 'react'
import { Button, Stack, Typography, Box, Grid, CardMedia, Card } from '@mui/material'
import axios from 'axios'


export default function Home() {
  const [imgUrl, setImgUrl] = useState('');
  useEffect(()=> {
    callImage();
  },[])

  const callImage = () => {
    const options = {
      method: 'GET',
      url: 'https://testnets-api.opensea.io/api/v1/assets?order_by=sale_price&order_direction=asc&offset=0&limit=1&include_orders=false'
    }
    axios.request(options)
      .then((res) => {
        setImgUrl(res.data.assets[0].image_url)
      })
      .catch((e) =>  console.error(e))
  }
  return (
    <div className='home' >
      <Box style={{height: '500px', marginBottom: '20px'}}>
        <div style={{height: '90%', backgroundPosition:'center', backgroundImage:`url(${imgUrl})`, backgroundSize: 'cover', backgroundRepeat:'no-repeat', filter:'blur(16px)'}}></div>
        <Grid container justifyContent="center" spacing={2} gap={5} mt={5} style={{zIndex: '2', position: 'absolute', top: '20%', left:'0%'}}>
          <Grid item xs={5} mt={5}>
            <Typography variant='h4' component='div' gutterBottom mt={8}>
            Discover, collect, and 
            sell extraordinary NFTs
            </Typography>
            <Typography variant='h6' component='div' gutterBottom>
            OpenSea is the world's first and largest NFT marketplace
            </Typography>
            <Stack direction='row' spacing={2} justifyContent='center' >
              <Button variant='contained'>Explore</Button>
              <Button variant='contained'>Create</Button>
            </Stack>
            <Typography variant='h6' component='div' mt={2}>
            Learn more about OpenSea
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Card >
              <CardMedia 
                component='img'
                image={imgUrl}
              />
            </Card>
          </Grid>
        </Grid>
      </Box>

    </div>
  )
}
