import React, { useState } from 'react'
import { Grid, Card, CardMedia, Box, Typography, Divider, CardContent, CardActions, Button, IconButton} from '@mui/material'
import { FavoriteBorder } from '@mui/icons-material'
import Buy from './Buy';

export default function NFTCard(props) {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () =>{ setIsHovering(true)}
  const handleMouseLeave = () => { setIsHovering(false)}
  const disable = props.isFilter && ((props.price === undefined && props.sell_orders === null )|| props.price === 0);
  const textStyle = {
    fontSize: '14px',
    fontWeight: 'bold',
    textDecoration: disable ? 'line-through' : ''
  }

  return (
    <Grid item xs={6} md={props.viewing === 'small'? 3:4}>
      <Card style={{
        boxShadow: isHovering? '1px 2px 9px rbga(0,0,0,0.2)':'',
        transform: isHovering? 'scale(1.02) translateY(-3px)':'',
        transition: 'transform 0.1s ease-in-out'
        }} variant='outlined' >
        {disable ? <CardMedia 
          component='img'
          height={props.viewing === 'small'? '300px':'400px'}
          style={{ backgroundImage:`url(${props.image_url})`, backgroundSize: 'cover', backgroundRepeat:'no-repeat', filter:'blur(15px)'}}
        /> :
        <CardMedia 
        onClick={() => props.handleModal(true, props.idx)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
          component='img'
          height={props.viewing === 'small'? '300px':'400px'}
          image={props.image_url}
        /> }
        <CardContent sx={{height:'55px', mb:1.5}}>
          <Box display='flex' sx={{mt:'2px'}}>
            <Box display='flex' flexDirection='column' alignItems='start' sx={{maxWidth:'50%', overflow:'hidden',textOverflow: "ellipsis"}}>
              <Typography noWrap style={{...textStyle, color: 'gray'}}>{props.name}</Typography>
              <div style={textStyle}>{props.name}</div>
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
              {props.last_sale === null ? '':<div style={{...textStyle, fontSize:'13px'}}>last {props.last_sale.total_price/10**18}</div>}
            </Box>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          {(props.sell_orders !== null || props.price > 0) ? <Buy price={props.price} token_id={props.token_id} />:''}
          <Box sx={{flexGrow:1}} />
          <IconButton>
            <FavoriteBorder sx={{height:'20px'}} />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  )
}
