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
import MesajKart from "./MesajKart";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
// import { GET_MSG } from "../graphql/queries";
import SendIcon from "@mui/icons-material/Send";
// import { SEND_MSG } from "../graphql/mutations";
// import { MSG_SUB } from "../graphql/subscriptions";
//import jwt_decode from "jwt-decode";
import { DANISANKULLANICIID_GETIR } from "../../graphql/mutations";
import { DIYETISYENICINMESAJLARI_GETIR } from "../../graphql/queries";
import { DANISANKULLANICIID_GETIRQUERY } from "../../graphql/queries";
import { MESAJ_EKLE } from "../../graphql/mutations";
import { MESAJ_SUB } from "../../graphql/subscriptions";
import jwt_decode from 'jwt-decode'

const ChatEkrani = ({ data: { id, ad } }) => {
  const [idData, setIdData] = useState(id);
  const [metin, setMetin] = useState("");
  const [mesajlar, setMesajlar] = useState([]);
  const {kullaniciId} =jwt_decode(localStorage.getItem('jwt'))
  console.log(id);
  //setIdData(id)

  const ref = useRef(null);
  const [danisanKullaniciIdGetir, { data: d1, loading: l1, error: e1 }] =
    useMutation(DANISANKULLANICIID_GETIR);

  const {
    loading: l2,
    data: d2,
    error: e2,
    refetch:r2
  } = useQuery(DIYETISYENICINMESAJLARI_GETIR, {
    variables: {
      danisanId: +id,
    },
    onCompleted(d2) {
      setMesajlar(d2.mesajlariGetirDiyetisyen);
    },
  });

  const {
    loading: l3,
    data: d3,
    error: e3,
  } = useQuery(DANISANKULLANICIID_GETIRQUERY, {
    variables: {
      danisanId: +id,
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
  //if(subData) console.log(subData)

  useEffect(()=>{
    r2()
  },[mesajlar])

  if (d3) {
    console.log(d3);
  }

  useEffect(() => {
    danisanKullaniciIdGetir({
      variables: {
        danisanId: +idData,
      },
    });
  }, [idData]);

  // if (data) {
  //   console.log(data);
  // }

  // danisanKullaniciIdGetir({
  //   variables:{
  //     danisanId: +id
  //   }
  // })

  // if(data){
  //   console.log(data)
  // }
  // const { loading, data, error } = useQuery(DANISANKULLANICIID_GETIRQUERY);
  // if(loading){
  //   <div>yükleniyor..</div>
  // }
  // if(data){
  //   console.log(data)
  // }

  // const { data, loading, error } = useQuery(GET_MSG, {
  //   variables: {
  //     receiverId: +id,
  //   },
  //   onCompleted(data) {
  //     setMessages(data.messagesByUser);
  //   },
  // });

  // const [sendMessage] = useMutation(SEND_MSG,{
  //   // onCompleted(data){
  //   //   setMessages((prevMessages)=>[...prevMessages,data.createMessage])
  //   // }
  // });

  // const { data: subData } = useSubscription(MSG_SUB, {
  //   onSubscriptionData({ subscriptionData: { data } }) {
  //     if (
  //       (data.messageAdded.receiverId == +id &&
  //         data.messageAdded.senderId == userId) ||
  //       (data.messageAdded.receiverId == userId &&
  //         data.messageAdded.senderId == +id)
  //     ) {
  //       setMessages((prevMessages) => [...prevMessages, data.messageAdded]);
  //     }
  //   },
  // });

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
            aliciId: +d3.danisanKullaniciIdGetirQuery,
            metin: metin,
          }
        })
      }
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
    <Box 
    flexGrow={1}
    width="157vh"
    >
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", boxShadow: 0, mt: "60px" }}
      >
        <Toolbar>
          <Avatar
            src={`https://avatars.dicebear.com/api/initials/${ad}.svg`}
            sx={{ width: "32px", height: "32px", mr: 2 }}
          />
          <Typography variant="h6" color="black">
            {ad}
          </Typography>
        </Toolbar>
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
                  msg.aliciId == +d3.danisanKullaniciIdGetirQuery
                    ? "end"
                    : "start"
                }
              />
            );
          })
        )}
        {/* <MesajKart metin="iyi" tarih="1223" yon="start" /> */}
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
                  aliciId: +d3.danisanKullaniciIdGetirQuery,
                  metin: metin,
                }
              })
            }
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

export default ChatEkrani;
