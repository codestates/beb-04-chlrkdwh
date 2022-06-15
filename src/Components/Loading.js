import { LinearProgress } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export default function Loading() {
  return (
    <Box sx={{width: '100%'}}>
      <LinearProgress />
    </Box>
  )
}
