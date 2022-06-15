import React from 'react'
import { Drawer, ListItem, Checkbox, TextField, FormControlLabel, Accordion, AccordionSummary, AccordionDetails, Typography, List } from '@mui/material'
import { Box } from '@mui/system';
import {ExpandMore } from '@mui/icons-material';


export default function ExploreDrawer(props) {
  return (
    <Drawer anchor='left' open={props.isDrawerOpen} onClose={props.toggleDrawer(false)}>
            <Box sx={{width: 250, pt:10}} role='presentation' onKeyDown={props.toggleDrawer(false)}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
              <Typography>Status</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {['Order Exist'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                      <FormControlLabel control={<Checkbox/>} label={text}/>
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Price</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{display: 'flex', alignItems:'center'}}>
                  <TextField sx={{mr:1}} defaultValue='ETH' disabled></TextField>
                  <TextField sx={{mr:1}}/>
                  <Typography sx={{mr:1}}>to</Typography>
                  <TextField />
                </Box>
              </AccordionDetails>
            </Accordion>
            </Box>
          </Drawer>
  )
}
