import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Tablo from "./Tablo";
import { Col, Row } from "reactstrap"
import Container from "@mui/material/Container";

  const DiyetisyenIslemleri = () => {
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
    <Row>
        <Col lg="12">
          <Tablo />
        </Col>
      </Row>
    </Container>
  </Box>
  )
}

export default DiyetisyenIslemleri