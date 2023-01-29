import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Copyright from "./copyright";
import "../../App.css";
import {Typography, Box } from "@mui/material";
import { useMutation } from "@apollo/client";
import { GIRISYAP_KULLANICI, GETIR_KULLANICITIPI } from "../../graphql/mutations";
import SifremiUnuttum from './SifremiUnuttum'
import DanisanAnaEkran from '../Danisan/DanisanAnaEkran'

const GirisEkrani = ({setKullaniciTipi}) => {
  const [formData,setFormData]= React.useState({})
  const [deneme,setDeneme]= React.useState(false)
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const [girisYapKullanici,{data:d1,loading:l1,error:e1}] = useMutation(GIRISYAP_KULLANICI,{
    onCompleted(data){
      localStorage.setItem("jwt",data.KullaniciGirisYap.token)
      console.log(data)
    }
  })

  const [kullaniciTipiGetir,{data:d2,loading:l2,error:e2}] = useMutation(GETIR_KULLANICITIPI,{
    onCompleted(data){
      console.log(data)
      setKullaniciTipi(data.kullaniciTipiGetir.kullaniciTipi)
    }
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setFormData({
      ...formData,
      [event.target.name]:event.target.value
  })
  };
  
  if(deneme){
    return <SifremiUnuttum />
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(formData)
    girisYapKullanici({
      variables:{
        kullaniciGiris:formData
      }
    })
    kullaniciTipiGetir({
      variables:{
        kullaniciGiris2:formData
      }
    })
  };

  return (
    <Box 
    component="form"
    onSubmit={handleSubmit}
    sx={{height: "100vh"}}
    >
    <header id="loginForm">
    <div className="login-form">
        {/* <form action="#"> */}
         <Typography
          variant="h6"
          sx={{ fontSize: { xs: "20px", sm: "25px" }, marginBottom: "25px",textAlign:"center" }}
        >
          Oturum Aç
        </Typography>
          
          <div className="row justify-content-between text-left">
            <div className="form-group col-sm-12 flex-column d-flex">
              <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                <TextField
                  type="text"
                  id="eposta"
                  label="E-posta"
                  name="email"
                  onChange={handleChange("email")}
                />
              </FormControl>
            </div>
          </div>

          <div className="row justify-content-between text-left">
            <div className="form-group col-sm-12 flex-column d-flex">
              <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                <InputLabel>Şifre</InputLabel>
                <OutlinedInput
                  id="sifre"
                  name="sifre"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                <br></br>
                {/* <Link to="SifremiUnuttum"> */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: "10px", sm: "15px" },
                      marginBottom: "25px",
                      textAlign:"right",
                      cursor: "pointer",
                    }}
                    onClick={()=>{
                      setDeneme(true)
                    }}
                  >
                    Şifrenizi Mi Unuttunuz?
                  </Typography>
                {/* </Link> */}
              </FormControl>
            </div>
          </div>
          <div className="row justify-content-end">
            <div className="form-group col-sm-12">
              <button id="sub_btn" type="submit" className="btn-block btn-primary">
                Oturum Açın
              </button>
            </div>
          </div>

         
        {/* </form> */}
      </div> 
      <Copyright sx={{ mt: 50 }} />
    </header>
    </Box>
  )
}

export default GirisEkrani