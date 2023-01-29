import React, { useState } from "react";
import { Box, Typography, Divider, Stack, Avatar } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import BosEkran from "./BosEkran";
import ChatEkrani from "./ChatEkrani";
import Danisanlar from "./Danisanlar";
import { useQuery, useMutation } from "@apollo/client";
import DanisanKart from "./DanisanKart";
import { DANISANLARINI_GETIR } from "../../graphql/queries";
import { DANISANKULLANICIID_GETIR } from "../../graphql/mutations";


const Chat = () => {
  const [aktif, setAktif] = useState(0);
  const [bilgiler, setBilgiler] = useState({});
  const { loading, data, error } = useQuery(DANISANLARINI_GETIR);

  if (loading) {
    return <Typography>bekleniyor..</Typography>;
  }
  // if (data) {
  //   console.log(data);
  // }

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
          <Typography variant="h6" mt="40px">
            Chat
          </Typography>
        </Stack>
        <Divider />
        <nav>
          {data.danisanKullanicilariListele.map((item) => (
            <Stack
              className="userCard"
              direction="row"
              spacing={2}
              sx={{ py: 1 }}
              onClick={() => {
                setAktif(1);
                setBilgiler({ id: item.id, ad: item.ad });
              }}
              //navigate(`/ChatEkrani/${id}/${ad}`)
              //<ChatEkrani  item={item} />
            >
              <Avatar
                src={`https://avatars.dicebear.com/api/initials/${item.ad}.svg`}
                sx={{ width: "32px", height: "32px" }}
              />
              <Typography variant="subtitle2">{item.ad}</Typography>
            </Stack>
            //return <DanisanKart key={item.id} item={item} />;
          ))}
        </nav>
      </Box>
      <Box>
        {aktif === 0 && <BosEkran/>}
        {aktif === 1 && <ChatEkrani data={bilgiler} />}
        {/* <ChatEkrani /> */}
      </Box>
    </Box>
  );
};

export default Chat;
