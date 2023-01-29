import React from 'react'
import {Box, Typography, Divider,Stack} from '@mui/material'
import { useQuery } from '@apollo/client';
import DanisanKart from './DanisanKart';
import {DANISANLARINI_GETIR} from "../../graphql/queries"

const Danisanlar = () => {
  const {loading,data,error}=useQuery(DANISANLARINI_GETIR)

  if(loading){
    return <Typography>bekleniyor..</Typography>
  }
  if(data){
    console.log(data)
  }
  return (
    <Box
    backgroundColor="#f7f7f7"
    height="100vh"
    width="250px"
    padding="10px"
    mt="20px"
    >
        <Stack
         direction="row"
         justifyContent="space-between"
        >
            <Typography variant="h6">Chat</Typography>
        </Stack>
        <Divider/>
        {
            data.danisanKullanicilariListele.map(item=>{
                return <DanisanKart key={item.id} item={item}/>
            })
        }
    </Box>
  )
}

export default Danisanlar