import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SelectedListItem from "./List";
import Copyright from "../Genel/copyright";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Card, CardBody} from "reactstrap";
import { useMutation } from "@apollo/client";
import {useState} from 'react'
import {DANISAN_EKLE} from "../../graphql/mutations"
import { useNavigate } from "react-router-dom";

const DanisanEkle = () => {
  const currencies = [
    {
      value: "Kadın",
      label: "Kadın",
    },
    {
      value: "Erkek",
      label: "Erkek",
    },
  ];

  const navigate = useNavigate()
  const [formData,setFormData]=useState({})
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const [danisanEkle,{data,loading,error}]=useMutation(DANISAN_EKLE)

  if(data){
    navigate("/")
  }

 const handleChange = (prop) => (event) => {
  setValues({ ...values, [prop]: event.target.value });
  setFormData({
    ...formData,
    [event.target.name]:event.target.value
})
};

  const handleSubmit = (event) => {
    event.preventDefault()
    danisanEkle({
        variables:{
          yeniDanisan:formData
        }
      })
    console.log(formData)
  };
  return (
    <Box
    component="form"
    onSubmit={handleSubmit}
    sx={{
      backgroundColor: (theme) =>
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[900],

      flexGrow: 1,
      height: "auto",
      overflow: "auto",
    }}
  >
    <Toolbar />
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Card>
      <CardBody>
      <div className="duzenle-form">
        {/* <form action="DiyetisyenPaneli"> */}
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "20px", sm: "25px" },
              marginBottom: "25px",
              textAlign: "center",
            }}
          >
           Danışan Ekle
          </Typography>

          <div className="row justify-content-between text-left">
            <div className="form-group col-sm-12 flex-column d-flex">
              <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                <TextField
                  type="text"
                  id="ad_soyad"
                  label="Ad Soyad "
                  name="ad"
                  onChange={handleChange("ad")}
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                <TextField type="text" id="email" label="E mail " name="email" onChange={handleChange("email")}/>
              </FormControl>

              <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                <TextField type="text" id="telefon" label="Telefon " name="telefon" onChange={handleChange("telefon")} />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Cinsiyet"
                  name="cinsiyet"
                  onChange={handleChange("cinsiyet")}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                <TextField type="text" id="sifre" label="Şifre " name="sifre" onChange={handleChange("sifre")}/>
              </FormControl>

              <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                <TextField type="text" id="yas" label="Yaş " name="yas" onChange={handleChange("yas")}/>
              </FormControl>

              <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                <TextField type="text" id="boy" label="Boy" name="boy" onChange={handleChange("boy")} />
              </FormControl>

              <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                <TextField type="text" id="kilo" label="Kilo " name="kilo" onChange={handleChange("kilo")} />
              </FormControl>
            </div>
          </div>

          <div className="row justify-content-end">
            <div className="form-group col-sm-12">
              <button
                id="sub_btn"
                type="submit"
                className="btn-block btn-primary"
              >
                Kaydet
              </button>
            </div>
          </div>
        {/* </form> */}
      </div>
      
      </CardBody>
      </Card>
    </Container>
  </Box>
  )
}

export default DanisanEkle