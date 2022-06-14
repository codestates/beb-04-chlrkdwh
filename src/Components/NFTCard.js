import React, { useState } from 'react'
import { Grid, Card, CardMedia, Box, Typography, Divider, CardContent, CardActions, Button, IconButton} from '@mui/material'
import { FavoriteBorder } from '@mui/icons-material'

export default function NFTCard(props) {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () =>{ setIsHovering(true)}
  const handleMouseLeave = () => { setIsHovering(false)}
  return (
    <Grid item xs={6} md={props.window === 'small'? 3:4}>
      <Card style={{
        transform: isHovering? 'scale(1.03) translateY(-5px)':'',
        transition: 'transform 0.1s ease-in-out'
        }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <CardMedia 
          component='img'
          height={props.window === 'small'? '300px':'400px'}
          image={props.image_url}
        />
        <CardContent sx={{height:'55px', mb:1.5}}>
          <Box display='flex'>
            <Box display='flex' flexDirection='column' alignItems='start' sx={{maxWidth:'50%', overflow:'hidden',textOverflow: "ellipsis"}}>
              <Typography noWrap style={{fontSize:'14px', fontWeight:'bold', color:'gray'}}>{props.name}</Typography>
              <div style={{fontSize:'14px', fontWeight:'bold'}}>{props.name}</div>
            </Box>
            <Box sx={{flexGrow:1}} />
            <Box>
              {props.sell_orders !== null ? <div style={{fontSize:'13px', fontWeight:'bold'}}>
                {props.sell_orders.reduce((acc, cur) =>{
                  if(cur.current_price > acc) return cur.current_price
                  else return cur.current_price;
                  //web3 라이브러리 적용 필요 (fromWdi)
                  },0)/1000000000000000000
                }
                </div>:''}
              <div style={{fontSize:'13px', fontWeight:'bold'}}>{props.total_price/1000000000000000000}</div>
            </Box>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          {props.sell_orders !== null && isHovering ? <Button variant='text' sx={{fontWeight:'bold'}}>Buy Now</Button>:''}
          <Box sx={{flexGrow:1}} />
          <IconButton>
            <FavoriteBorder sx={{height:'20px'}} />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  )
}
