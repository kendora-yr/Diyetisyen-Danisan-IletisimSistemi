import React from 'react'
import {Box} from '@mui/material'
import {Route,Routes} from 'react-router-dom'
import BosEkran from './BosEkran'
import ChatEkrani from './ChatEkrani'
import Danisanlar from './Danisanlar'

const AllRoutes=()=>{
    return(
        <Routes>
            <Route path="/Chat" element={<BosEkran/>}></Route>
            <Route path="/Chat/:id/:name" element={<ChatEkrani/>}></Route>
        </Routes>

    )
}

const Chat = () => {
  return (
    <Box
     display="flex" 
    >
        <Danisanlar/>
        <BosEkran/>
    </Box>
  )
}

export default Chat