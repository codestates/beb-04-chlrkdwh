import React from 'react'
import { Modal, Typography, List, ListItem, ListItemText } from '@mui/material'
import { Box } from '@mui/system'

export default function ExploreModal(props) {
  const data = props.modalData[0];
  if(!data) return;
  return (
    <Modal open={props.isModalOpen} onClose={() => props.handleModal(false)}>
      <Box sx={{ position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 450,
        maxHeight: 650,
        bgcolor: 'white',
        boxShadow: 24,
        p: 4,
        overflow: 'scroll'
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          NFT Information
        </Typography>
        <img src={data.image_url} style={{maxWidth:'200px', maxHeight: '200px', margin:'10px'}} />
        <List>
          <ListItem>
            <ListItemText
              primary="Collection Name"
              secondary={data.collection.name === null ? 'Null': data.collection.name}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Name"
              secondary={data.name === null ? 'Null': data.name}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Contract Address"
              secondary={data.asset_contract.address === null ? 'Null': data.asset_contract.address}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Token ID"
              secondary={data.token_id === null ? 'Null': data.token_id}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Token Standard"
              secondary={data.asset_contract === null ? 'Null': data.asset_contract.schema_name}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Highest Orders"
              secondary={data.sell_orders === null ? 'Null': data.sell_orders.reduce((acc, cur) =>{
                if(cur.current_price > acc) return cur.current_price
                else return cur.current_price;
                //web3 라이브러리 적용 필요 (fromWei)
                },0)/10**18}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Last Sale Price"
              secondary={data.last_sale === null ? 'Null': (data.last_sale.total_price/10 ** 18)+' '+data.last_sale.payment_token.symbol}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Description"
              secondary={data.description === null ? 'Null': data.description}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Traits"
            />
            <div style={{height:'70px', overflowY:'scroll'}}>
            {data.traits.length === 0 ? <ListItemText
              secondary="Null"
            />: data.traits.map((el) => 
              <ListItemText sx={{pr:8}} primary={el.trait_type} secondary={el.value} />
              )}
            </div>
          </ListItem>
        </List>
      </Box>
    </Modal>
  )
}
