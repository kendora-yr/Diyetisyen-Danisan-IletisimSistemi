import React from "react";
import { Box } from "@mui/system";
import { Button, Typography,Paper } from "@mui/material";



const NoPage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundImage: `url("http://salehriaz.com/404Page/img/bg_purple.png")`,
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          width: { xs: "320px", sm: "450px" },
          height: { xs: "320px", sm: "450px" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgb(255,255,255,0.7)",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "150px", sm: "200px" },
            fontFamily: "Passion One",
            color: "#34303e",
          }}
        >
          404
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontSize: { xs: "20px", sm: "25px" }, marginBottom: "25px",textAlign:"center" }}
        >
          Üzgünüz, erişmek istediğiniz sayfa bulunamadı :(
        </Typography>
        <Button variant="contained">GERİ DÖN</Button>
      </Paper>
    </Box>
  );
};

export default NoPage;