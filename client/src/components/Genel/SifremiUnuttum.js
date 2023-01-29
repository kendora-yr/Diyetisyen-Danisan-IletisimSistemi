import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Copyright from "./copyright";
import "../../App.css";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Typography, Box } from "@mui/material";
import { useMutation } from "@apollo/client";
import { SIFRE_DEGISTIR } from "../../graphql/mutations";
import GirisEkrani from "./GirisEkrani";

export default function SifremiUnuttum() {
  const [values, setValues] = React.useState({
    checked: false,
    showPassword: false,
  });
  const [formData,setFormData]= React.useState({})
  const [gecis,setGecis]= React.useState(false)
  const [kullaniciTipi,setKullaniciTipi]=React.useState(10)


  const [sifreDegistirKullanici,{data:d1,loading:l1,error:e1}] = useMutation(SIFRE_DEGISTIR,{
    onCompleted(data){
      console.log(data)
    }
  })

  const handleChangeForm = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setFormData({
      ...formData,
      [event.target.name]:event.target.value
  })
  };

  // if(gecis){
  //   return <GirisEkrani setKullaniciTipi={setKullaniciTipi}/>
  // }

  const handleChange = (event) => {
    setValues({
      ...values,
      checked: !checked,
      showPassword: !values.showPassword,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(formData)
    sifreDegistirKullanici({
      variables:{
        sifreSifirlama:formData
      }
    })
    // if(!e1){
    //     setGecis(true)
    // }
    // kullaniciTipiGetir({
    //   variables:{
    //     kullaniciGiris2:formData
    //   }
    // })
  };

  const { checked } = values;

  return (
    <Box 
    component="form"
    onSubmit={handleSubmit}
    sx={{height: "100vh"}}
    >
    <header id="forgetForm">
      <div className="forget-form">
        <div className="text-center m-4-auto">
            <Typography
              variant="h6"
              sx={{ fontSize: { xs: "20px", sm: "25px" }, marginBottom: "25px", textAlign: "center" }}
            >
              Şifre Yenileme
            </Typography>
            <div class="row justify-content-between text-left">
              <div class="form-group col-sm-12 flex-column d-flex">
                <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                  <TextField id="eposta" label="E-posta" name="email" onChange={handleChangeForm("email")}/>
                </FormControl>
              </div>
            </div>

            <div class="row justify-content-between text-left">
              <div class="form-group col-sm-12 flex-column d-flex">
                <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                  <InputLabel>Yeni Şifre</InputLabel>
                  <OutlinedInput
                    id="yenisifre"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    label="Password"
                    name="yeniSifre"
                    onChange={handleChangeForm("yeniSifre")}
                  />
                </FormControl>
              </div>
            </div>

            <div class="row justify-content-between text-left">
              <div class="form-group col-sm-12 flex-column d-flex">
                <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                  <InputLabel>Yeni Şifre Tekrar</InputLabel>
                  <OutlinedInput
                    id="yeni_sifre_tekrar"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    label="checkpassword"
                    name="yeniSifreTekrar"
                    onChange={handleChangeForm("yeniSifreTekrar")}
                  />
                </FormControl>
              </div>
            </div>

            <div class="row justify-content-between text-left">
              <div
                id="check-box"
                class="form-group col-sm-12 flex-column d-flex"
              >
                <FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox checked={checked} onChange={handleChange} />
                    }
                   
                    label="Şifreyi Göster"
                  />
                  </FormControl>
              </div>
            </div>
            <div class="row justify-content-end">
              <div class="form-group col-sm-12">
                <button
                  id="sub_btn"
                  type="submit"
                  class="btn-block btn-primary"
                >
                  Kaydet
                </button>
              </div>
            </div>

            <br></br>
        </div>
      </div>
      <Copyright sx={{ mt: 2 }} />
    </header>
    </Box>
  );
}
