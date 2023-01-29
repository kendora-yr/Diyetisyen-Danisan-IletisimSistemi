import React from "react";
import "../../App.css";
import Chat from "./Chat";
import Diyetisyenim from "./Diyetisyenim";
import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import SelectedListItem from "./DanisanMenu";
import List from "@mui/material/List";
import {Box,AppBar} from "@mui/material";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/Chat" element={<Chat />}></Route>
      <Route path="/" element={<Diyetisyenim />}></Route>
    </Routes>
  );
};

const DanisanAnaEkran = ({ setKullaniciTipi }) => {
  return (
    <Box>
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <List component="nav">
          <SelectedListItem setKullaniciTipi={setKullaniciTipi} />
        </List>
      </Container>
    </AppBar>
    <AllRoutes />
    </Box>
  );
};

export default DanisanAnaEkran;
