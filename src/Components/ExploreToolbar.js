import React from 'react'
import { Toolbar, IconButton, FormControl, FormControlLabel, InputLabel, Select, MenuItem, ToggleButtonGroup, ToggleButton, Switch} from '@mui/material'
import { Box } from '@mui/system'
import { FilterList, GridOn, Window } from '@mui/icons-material'

export default function ExploreToolbar(props) {
  return (
      <Toolbar variant='dense' sx={{my:2}}>
        <IconButton onClick={props.toggleDrawer(true)} sx={{mr:2}} >
          <FilterList size='large'/>
        </IconButton>
        <FormControlLabel control={<Switch checked={props.ismyNfts} onChange={props.handleSwitch} />} label="Chlrkdwh" />
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
          <ToggleButtonGroup value={props.viewing} exclusive onChange={props.handleViewing}>
            <ToggleButton value="small">
              <GridOn />
            </ToggleButton>
            <ToggleButton value="big">
              <Window />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Toolbar>
  )
}
