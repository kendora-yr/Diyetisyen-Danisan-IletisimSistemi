import * as React from "react";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import PeopleIcon from "@mui/icons-material/People";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { useNavigate } from "react-router-dom";
import ChatIcon from '@mui/icons-material/Chat';


export default function SelectedListItem({setkullaniciTipi}) {
  const navigate = useNavigate()
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <React.Fragment>
      <ListItemButton onClick={()=>navigate("/")}>
        {/* <NavLink
          to="/DiyetisyenPaneli"
          style={({ isActive }) => (isActive ? { color: "purple" } : undefined)}
        > */}
          {
            <ListItem>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText>Danışan İşlemleri</ListItemText>
            </ListItem>
          }
        {/* </NavLink> */}
      </ListItemButton>

      <ListItemButton onClick={()=>navigate("/Chat")}>
        {/* <NavLink
          to="/DiyetisyenProfil"
          style={({ isActive }) => (isActive ? { color: "purple" } : undefined)}
        > */}
          {
            <ListItem>
              <ListItemIcon>
                <ChatIcon />
              </ListItemIcon>
              <ListItemText>Chat</ListItemText>
            </ListItem>
          }
        {/* </NavLink> */}
      </ListItemButton>

      {/* <ListItemButton onClick={()=>navigate("/Profil")}> */}
        {/* <NavLink
          to="/DiyetisyenProfil"
          style={({ isActive }) => (isActive ? { color: "purple" } : undefined)}
        > */}
          {/* {
            <ListItem>
              <ListItemIcon>
                <ManageAccountsOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Profilim</ListItemText>
            </ListItem>
          } */}
        {/* </NavLink> */}
      {/* </ListItemButton> */}

      <ListItemButton 
       onClick={()=>{
          window.location.reload()
          localStorage.removeItem('jwt')
          setkullaniciTipi(9)
      }}>
        {/* <NavLink
          to="/"
          style={({ isActive }) =>
            isActive ? { color: "purple" } : undefined
          } 
        > */}
          {
            <ListItem>
              <ListItemIcon>
                <ExitToAppOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Çıkış Yap</ListItemText>
            </ListItem>
          }
        {/* </NavLink> */}
      </ListItemButton>
 
      </React.Fragment>
    </Box>
  );
}