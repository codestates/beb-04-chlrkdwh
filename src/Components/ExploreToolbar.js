import React from 'react'
import { Toolbar, IconButton, Button, FormControl, InputLabel, Select, MenuItem, ToggleButtonGroup, ToggleButton, Switch} from '@mui/material'
import { Box } from '@mui/system'
import { FilterList, GridOn, Window } from '@mui/icons-material'

export default function ExploreToolbar(props) {
  return (
      <Toolbar variant='dense' sx={{my:2}}>
        <IconButton onClick={props.toggleDrawer(true)} >
          <FilterList size='large'/>
        </IconButton>
        <Switch checked={props.ismyNfts} onChange={props.handleSwitch} />
        <Box sx={{flexGrow:1}} />
        <Box sx={{display: {xs: 'none', md: 'flex'}}} >
          <FormControl sx={{m:1, minWidth: 120}}>
          <InputLabel id="demo-simple-select-label">Sortby</InputLabel>
            <Select value={props.listing} onChange={props.handleSelect} label="Sortby">
              <MenuItem value='recentSale'>Recently Sale</MenuItem>
              <MenuItem value='saleCount'>Sale Count</MenuItem>
              <MenuItem value='highLastSale'>Highest Last Sale</MenuItem>
              <MenuItem value='lowLastSale'>Lowest Last Sale</MenuItem>
              <MenuItem value='oldest'>Oldest Sale</MenuItem>
            </Select>
          </FormControl>
          <ToggleButtonGroup value={props.window} exclusive onChange={props.handleWindow}>
            <ToggleButton value="small">
              <GridOn />
            </ToggleButton>
            <ToggleButton value="window">
              <Window />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Toolbar>
  )
}
