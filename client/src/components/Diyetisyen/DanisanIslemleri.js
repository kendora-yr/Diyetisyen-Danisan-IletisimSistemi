import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Tablo from "./Tablo";
import { Col, Row } from "reactstrap";

const DanisanIslemleri = () => {
  const mdTheme = createTheme();
  return (
    <ThemeProvider theme={mdTheme}>
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
    </ThemeProvider>

  )
}

export default DanisanIslemleri