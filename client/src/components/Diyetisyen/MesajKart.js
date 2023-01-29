import React from 'react'
import { Box, Typography } from '@mui/material'

const MesajKart = ({metin,tarih,yon}) => {
  return (
    <Box
    display="flex"
    justifyContent={yon}
    >
        <Box>
        <Typography 
        variant="subtitle2"
        backgroundColor="white"
        padding="5px"
        >{metin}</Typography>
        <Typography 
        variant="caption"
        >{new Date(tarih).toLocaleTimeString()}</Typography>
        </Box>
    </Box>
    
  )
}

export default MesajKart