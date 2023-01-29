import React from "react";
import { Box , Typography, Divider,Stack} from "@mui/material";
import { Route, Routes } from "react-router-dom";
import BosEkran from "./BosEkran";
import ChatEkrani from "./ChatEkrani";
import Danisanlar from "./Danisanlar";
import { useQuery } from '@apollo/client';
import DanisanKart from './DanisanKart';
import {DANISANLARINI_GETIR} from "../../graphql/queries"

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/Chat" element={<BosEkran />}></Route>
      <Route path="/Chat/:id/:name" element={<ChatEkrani />}></Route>
    </Routes>
  );
};

const Chat = () => {
  const {loading,data,error}=useQuery(DANISANLARINI_GETIR)

  if(loading){
    return <Typography>bekleniyor..</Typography>
  }
  if(data){
    console.log(data)
  }
  return (
    <Box display="flex">
      <Box
        backgroundColor="#f7f7f7"
        height="100vh"
        width="250px"
        padding="10px"
        mt="20px"
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6">Chat</Typography>
        </Stack>
        <Divider />
        {data.danisanKullanicilariListele.map((item) => {
          return <DanisanKart key={item.id} item={item} />;
        })}
      </Box>
      <BosEkran />
    </Box>
  );
};

export default Chat;
