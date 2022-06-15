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
        boxShadow: isHovering? '1px 2px 9px rbga(0,0,0,0.2)':'',
        transform: isHovering? 'scale(1.02) translateY(-3px)':'',
        transition: 'transform 0.1s ease-in-out'
        }} variant='outlined' onClick={() => props.handleModal(true, props.idx)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
                order {props.sell_orders.reduce((acc, cur) =>{
                  if(cur.current_price > acc) return cur.current_price
                  else return cur.current_price;
                  //web3 라이브러리 적용 필요 (fromWei)
                  },0)/10 ** 18
                }
                </div>:''}
              {props.last_sale === null ? '':<div style={{fontSize:'13px', fontWeight:'bold'}}>last {props.last_sale.total_price/10**18}</div>}
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
