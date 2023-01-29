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
import  SelectedListItem from "./List";
import Copyright from "../Genel/copyright";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Card, CardBody} from "reactstrap";


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


function DanisanDuzenle() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (        
        <Box
          component="main"
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
                 Danışan Düzenle
                </Typography>

                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-12 flex-column d-flex">
                    <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                      <TextField
                        type="text"
                        id="ad_soyad"
                        label="Ad Soyad "
                      />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                      <TextField type="text" id="email" label="E mail " />
                    </FormControl>

                    <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                      <TextField type="text" id="tc" label="TC Kimlik No " />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                      <TextField type="text" id="telefon" label="Telefon " />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                      <TextField
                        id="outlined-select-currency"
                        select
                        label="Cinsiyet"
                      >
                        {currencies.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                      <TextField type="text" id="sifre" label="Şifre " />
                    </FormControl>

                    <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                      <TextField type="text" id="yas" label="Yaş " />
                    </FormControl>

                    <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                      <TextField type="text" id="kilo" label="Kilo " />
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
  );
}

export default function Dashboard() {
  return <DanisanDuzenle />;
}
