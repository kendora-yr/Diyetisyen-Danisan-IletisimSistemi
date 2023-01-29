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
import {DIYETISYEN_EKLE} from "../../graphql/mutations"
import { useNavigate } from "react-router-dom";


// const drawerWidth = 230;
// const currencies = [
//   {
//     value: "Kadın",
//     label: "Kadın",
//   },
//   {
//     value: "Erkek",
//     label: "Erkek",
//   },
// ];

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   "& .MuiDrawer-paper": {
//     position: "relative",
//     whiteSpace: "nowrap",
//     width: drawerWidth,
//     backgroundColor: "white",
//     borderRight: "2px",
//     borderTop: "2px purple solid",
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     boxSizing: "border-box",
//     ...(!open && {
//       overflowX: "hidden",
//       transition: theme.transitions.create("width", {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//       }),
//       width: theme.spacing(7),
//       [theme.breakpoints.up("sm")]: {
//         width: theme.spacing(9),
//       },
//     }),
//   },
// }));

// const mdTheme = createTheme();

function DiyetisyenEkle() {
  // const [open, setOpen] = React.useState(true);
  // const toggleDrawer = () => {
  //   setOpen(!open);
  // };
  const navigate = useNavigate()
  const [formData,setFormData]=useState({})
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const [diyetisyenEkle,{data,loading,error}]=useMutation(DIYETISYEN_EKLE)

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
    diyetisyenEkle({
        variables:{
          yeniDiyetisyen:formData
        }
      })
    console.log(formData)
  };

  return (
    // <ThemeProvider theme={mdTheme}>
    //   <Box sx={{ display: "flex" }}>
    //     <CssBaseline />
    //     <AppBar position="absolute" open={open}>
    //       <Toolbar
    //         sx={{
    //           pr: "24px",
    //           backgroundColor: "#b300b3",
    //         }}
    //       >
    //         <IconButton
    //           edge="start"
    //           color="inherit"
    //           aria-label="open drawer"
    //           onClick={toggleDrawer}
    //           sx={{
    //             marginRight: "36px",
    //             ...(open && { display: "none" }),
    //           }}
    //         >
    //           <MenuIcon />
    //         </IconButton>
    //         <Typography
    //           component="h1"
    //           variant="h6"
    //           color="inherit"
    //           noWrap
    //           sx={{ flexGrow: 1 }}
    //         >
    //           Admin Paneli
    //         </Typography>
    //         <IconButton color="inherit">
    //           <Badge badgeContent={4} color="secondary">
    //             <NotificationsIcon />
    //           </Badge>
    //         </IconButton>
    //       </Toolbar>
    //     </AppBar>
       
    //       <Drawer variant="permanent" open={open}>
    //         <Toolbar
    //           sx={{
    //             display: "flex",
    //             alignItems: "center",
    //             justifyContent: "flex-end",
    //             px: [1],
    //           }}
    //         >
    //           <IconButton onClick={toggleDrawer}>
    //             <ChevronLeftIcon />
    //           </IconButton>
    //         </Toolbar>

    //         <List component="nav"><SelectedListItem/></List>
    //       </Drawer>
        
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
            <div className="ekle-form">
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: "20px", sm: "25px" },
                    marginBottom: "25px",
                    textAlign: "center",
                  }}
                >
                 Diyetisyen Ekle
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
                      <TextField type="text" id="telefon" label="Telefon " name="telefon" onChange={handleChange("telefon")}/>
                    </FormControl>

                    <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                      <TextField type="text" id="sifre" label="Şifre " name="sifre" onChange={handleChange("sifre")}/>
                    </FormControl>

                  </div>
                </div>

                <div className="row justify-content-end">
                  <div className="form-group col-sm-12">
                    <button
                      id="sub_btn"
                      type="submit"
                      className="btn-block btn-secondary"
                    >
                      Kaydet
                    </button>
                  </div>
                </div>
            </div>
            </CardBody>
            </Card>
          </Container>
        </Box>
    //   </Box>

    //   <br></br>
    //   <br></br>

    //   <Copyright sx={{ mt: 2 }} />
    // </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DiyetisyenEkle />;
}
