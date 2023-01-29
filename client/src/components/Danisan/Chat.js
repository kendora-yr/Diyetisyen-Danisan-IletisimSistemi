import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  Box,
  TextField,
  Stack,
} from "@mui/material";
import MesajKart from "../Diyetisyen/MesajKart";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
// import { GET_MSG } from "../graphql/queries";
import SendIcon from "@mui/icons-material/Send";
import {
  DANISANICINDIYETISYENINI_GETIR,
  DANISANICINMESAJLARI_GETIR,
  DIYETISYENKULLANICIID_GETIRQUERY,
} from "../../graphql/queries";
// import { SEND_MSG } from "../graphql/mutations";
// import { MSG_SUB } from "../graphql/subscriptions";
//import jwt_decode from "jwt-decode";
// import { DANISANKULLANICIID_GETIR } from "../../graphql/mutations";
// import { DIYETISYENICINMESAJLARI_GETIR } from "../../graphql/queries";
// import { DANISANKULLANICIID_GETIRQUERY } from "../../graphql/queries";
import { MESAJ_EKLE } from "../../graphql/mutations";
import { MESAJ_SUB } from "../../graphql/subscriptions";

const Chat = () => {
  const [idData, setIdData] = useState(0);
  const [metin, setMetin] = useState("");
  const [mesajlar, setMesajlar] = useState([]);
  // console.log(id);
  // //setIdData(id)

  const ref = useRef(null);
  const ad = "birisi";
  // const [danisanKullaniciIdGetir, { data: d1, loading: l1, error: e1 }] =
  //   useMutation(DANISANKULLANICIID_GETIR);

  const {
    loading: l1,
    data: d1,
    error: e1,
  } = useQuery(DANISANICINDIYETISYENINI_GETIR);

  const {
    loading: l3,
    data: d3,
    error: e3,
  } = useQuery(DIYETISYENKULLANICIID_GETIRQUERY);

  if (l1) {
    <div>Bekleniyor...</div>;
  }

  if(d1){
    const diyetisyenId=d1.danisanIcinDiyetisyeniniGetir.id
  }

  const {
    loading: l2,
    data: d2,
    error: e2,
    refetch: r2,
  } = useQuery(DANISANICINMESAJLARI_GETIR, {
    onCompleted(d2) {
      setMesajlar(d2.mesajlariGetirDanisan);
    },
  });

  const [mesajGonder] = useMutation(MESAJ_EKLE, {
    // onCompleted(data) {
    //   setMesajlar((prevMesajlar) => [...prevMesajlar, data.mesajEkle]);
    // },
  });

  const {data:subData}=useSubscription(MESAJ_SUB,{
    onSubscriptionData({subscriptionData:{data}}){
      setMesajlar((prevMesajlar) => [...prevMesajlar, data.mesajEklendi]);
    }
  })

  useEffect(()=>{
    r2()
  },[mesajlar])


  if (d1) console.log(d1);

  const handleClick = () => {
    // 👇️ clear input value
    setMetin("");
    // danisanKullaniciIdGetir({
    //   variables: {
    //     danisanId: +id,
    //   },
    // });

    // if (data) {
    //   console.log(data);
    // }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if(l3){
        <div>bişiler</div>
      }
      if (d3) {
        mesajGonder({
          variables: {
            aliciId: +d3.diyetisyenKullaniciIdGetirQuery,
            metin: metin,
          }
        })
      }
      // if(l3){
      //   <div>bişiler</div>
      // }
      // if (d3) {
      //   mesajGonder({
      //     variables: {
      //       aliciId: +d3.danisanKullaniciIdGetirQuery,
      //       metin: metin,
      //     }
      //   })
      // }
      // sendMessage({
      //   variables: {
      //     receiverId: +id,
      //     text: text,
      //   },
      // });
      handleClick();
    }
  };

  return (
    <Box flexGrow={1} pt="20px" pb="20px">
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", boxShadow: 0, mt: "60px" }}
      >
        {l1 ? (
          <div>Yükleniyor...</div>
        ) : (
          <Toolbar>
            <Avatar
              src={`https://avatars.dicebear.com/api/initials/${d1.danisanIcinDiyetisyeniniGetir.ad}.svg`}
              sx={{ width: "32px", height: "32px", mr: 2 }}
            />
            <Typography variant="h6" color="black">
              {d1.danisanIcinDiyetisyeniniGetir.ad}
            </Typography>
          </Toolbar>
        )}
      </AppBar>
      <Box
        backgroundColor="#f5f5f5"
        height="80vh"
        padding="10px"
        sx={{ overflowY: "auto" }}
      >
        {/* d2.mesajlariGetirDiyetisyen */}
        {l2 && l3 ? (
          <Typography variant="h6">Chat Yükleniyor...</Typography>
        ) : (
          mesajlar.map((msg) => {
            return (
              <MesajKart
                key={msg.olusturmaTarihi}
                metin={msg.metin}
                tarih={msg.olusturmaTarihi}
                yon={
                  msg.aliciId == +d3.diyetisyenKullaniciIdGetirQuery
                    ? "end"
                    : "start"
                }
              />
            );
          })
        )}
        {/* <MesajKart metin="iyi" tarih="1223" yon="start" />
        <MesajKart metin="iyi" tarih="1223" yon="end" />
        <MesajKart metin="iyi" tarih="1223" yon="start" /> */}
        {/* {loading ? (
          <Typography variant="h6">loading chats</Typography>
        ) : (
          messages.map((msg) => {
            return (
              <MesajKart
                key={msg.createdAt}
                text={msg.text}
                date={msg.createdAt}
                direction={msg.receiverId == +id ? "end" : "start"}
              />
            );
          })
        )} */}
        {/* 
          <MessageCard text="hi mukesh" date="1223" direction="end" /> */}
      </Box>
      <Stack direction="row">
        <TextField
          ref={ref}
          id="myInput"
          placeholder="mesaj yazın"
          variant="standard"
          fullWidth
          multiline
          rows={2}
          value={metin}
          onChange={(e) => setMetin(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <SendIcon
          fontSize="large"
          onClick={() => {
            if(l3){
              <div>bişiler</div>
            }
            if (d3) {
              mesajGonder({
                variables: {
                  aliciId: +d3.diyetisyenKullaniciIdGetirQuery,
                  metin: metin,
                }
              })
            }
            // if(l3){
            //   <div>bişiler</div>
            // }
            // if (d3) {
            //   mesajGonder({
            //     variables: {
            //       aliciId: +d3.danisanKullaniciIdGetirQuery,
            //       metin: metin,
            //     }
            //   })
            // }
            //---önceki düşündüğüm çift tıklama gerektiren durum
            // setIdData(id);
            // if (d1) {
            //   if(d1.danisanKullaniciIdGetir.danisanId===+id){
            //     console.log(d1);
            //   }
            // }
            //---önceki düşündüğüm çift tıklama gerektiren durum
            // sendMessage({
            //   variables: {
            //     receiverId: +id,
            //     text: text,
            //   },
            // });
            handleClick();
          }}
        />
      </Stack>
    </Box>
  );
};

export default Chat;
