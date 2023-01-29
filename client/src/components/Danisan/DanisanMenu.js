import * as React from "react";

import Box from "@mui/material/Box";

import { useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";

import Menu from "@mui/material/Menu";

import AdbIcon from "@mui/icons-material/Adb";

import { ListItem, ListItemText } from "@mui/material";

import ListItemButton from "@mui/material/ListItemButton";

import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";

import Container from "@mui/material/Container";

import MenuIcon from "@mui/icons-material/Menu";

import IconButton from "@mui/material/IconButton";

import MenuItem from "@mui/material/MenuItem";



export default function SelectedListItem({ setkullaniciTipi }) {

  const navigate = useNavigate();



  const [anchorElNav, setAnchorElNav] = React.useState(null);



  const handleOpenNavMenu = (event) => {

    setAnchorElNav(event.currentTarget);

  };



  const handleCloseNavMenu = () => {

    setAnchorElNav(null);

  };



  return (

    <AppBar position="static">

      <Container maxWidth="xl">

        <Toolbar disableGutters>

          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />

          <Typography

            variant="h6"

            noWrap

            sx={{

              mr: 1,

              display: { xs: "none", md: "flex" },

              fontFamily: "monospace",

              fontWeight: 700,

              letterSpacing: ".3rem",

              color: "inherit",

              textDecoration: "none",

            }}

          >

            LOGO

          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>

            <IconButton

              size="large"

              aria-label="account of current user"

              aria-controls="menu-appbar"

              aria-haspopup="true"

              onClick={handleOpenNavMenu}

              color="inherit"

            >

              <MenuIcon />

            </IconButton>

            <Menu

              id="menu-appbar"

              anchorEl={anchorElNav}

              anchorOrigin={{

                vertical: "bottom",

                horizontal: "left",

              }}

              keepMounted

              transformOrigin={{

                vertical: "top",

                horizontal: "left",

              }}

              open={Boolean(anchorElNav)}

              onClose={handleCloseNavMenu}

              sx={{

                display: { xs: "block", md: "none" },

              }}

            >

              {/* <MenuItem onClick={handleCloseNavMenu}>

                <ListItemButton onClick={() => navigate("")}>

                  {

                    <ListItem>

                      <ListItemText>İSTATİSTİKLERİM</ListItemText>

                    </ListItem>

                  }

                </ListItemButton>

              </MenuItem> */}



              <MenuItem onClick={handleCloseNavMenu}>

                <ListItemButton onClick={() => navigate("/")}>

                  {

                    <ListItem>

                      <ListItemText>DİYETİSYENİM</ListItemText>

                    </ListItem>

                  }

                </ListItemButton>

              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>

                <ListItemButton onClick={() => navigate("/Chat")}>

                  {

                    <ListItem>

                      <ListItemText>CHAT</ListItemText>

                    </ListItem>

                  }

                </ListItemButton>

              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>

                <ListItemButton

                  onClick={() => {

                    window.location.reload();



                    localStorage.removeItem("jwt");



                    setkullaniciTipi(9);

                  }}

                >

                  {

                    <ListItem>

                      <ListItemText>ÇIKIŞ</ListItemText>

                    </ListItem>

                  }

                </ListItemButton>

              </MenuItem>

            </Menu>

          </Box>

          <Box sx={{ flexGrow: 0 }}>

            <Menu

              sx={{ mt: "45px" }}

              id="menu-appbar"

              keepMounted

              transformOrigin={{

                vertical: "top",

                horizontal: "right",

              }}

            ></Menu>

          </Box>



          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

          <Typography

            variant="h5"

            noWrap

            sx={{

              mr: 2,

              display: { xs: "flex", md: "none" },

              flexGrow: 1,

              fontFamily: "monospace",

              fontWeight: 700,

              letterSpacing: ".3rem",

              color: "inherit",

              textDecoration: "none",

            }}

          >

            LOGO

          </Typography>



          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>

            {/* <MenuItem onClick={handleCloseNavMenu}>

              <ListItemButton onClick={() => navigate("")}>

                {

                  <ListItem>

                    <ListItemText>İSTATİSTİKLERİM</ListItemText>

                  </ListItem>

                }

              </ListItemButton>

            </MenuItem> */}



            <MenuItem onClick={handleCloseNavMenu}>

              <ListItemButton onClick={() => navigate("/")}>

                {

                  <ListItem>

                    <ListItemText>DİYETİSYENİM</ListItemText>

                  </ListItem>

                }

              </ListItemButton>

            </MenuItem>

            <MenuItem onClick={handleCloseNavMenu}>

              <ListItemButton onClick={() => navigate("/Chat")}>

                {

                  <ListItem>

                    <ListItemText>CHAT</ListItemText>

                  </ListItem>

                }

              </ListItemButton>

            </MenuItem>

          </Box>

          <Box></Box>

          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" }, p: 0 }}>

            <ListItemButton

              onClick={() => {

                window.location.reload();

                localStorage.removeItem("jwt");

                setkullaniciTipi(9);

              }}

            >

              {

                <ListItem>

                  <ListItemText>ÇIKIŞ</ListItemText>

                </ListItem>

              }

            </ListItemButton>

          </Box>

          <Box sx={{ flexGrow: 0 }}>

            <Menu

              sx={{ mt: "45px" }}

              id="menu-appbar"

              keepMounted

              transformOrigin={{

                vertical: "top",

                horizontal: "right",

              }}

            ></Menu>

          </Box>

        </Toolbar>

      </Container>

    </AppBar>

  );

}