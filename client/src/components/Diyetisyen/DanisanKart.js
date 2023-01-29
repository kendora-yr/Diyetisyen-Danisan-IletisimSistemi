import React from 'react'
import {Stack, Avatar, Typography} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ChatEkrani from './ChatEkrani'

const DanisanKart = ({item:{id, ad}}) => {
    const navigate = useNavigate()
    const item={
      id:id,
      ad:ad
    }
  return (
    <Stack
     className="userCard"
     direction="row"
     spacing={2}
     sx={{py:1}}
     onClick={()=>navigate("/ChatEkrani")}
     //navigate(`/ChatEkrani/${id}/${ad}`)
     //<ChatEkrani  item={item} />
    >
        <Avatar
         src={`https://avatars.dicebear.com/api/initials/${ad}.svg`}
         sx={{width:"32px", height:"32px"}}
        />
        <Typography variant="subtitle2">{ad}</Typography>
    </Stack>
  )
}

export default DanisanKart