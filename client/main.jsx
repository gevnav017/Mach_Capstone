import React from "react";
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider } from "@mui/material";

import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: "#0092CA",
      light: "02aced",
      dark: "0276a3",
      contrastText: "#fff"
    },
    secondary: {
      main: "#3c4757",
      light: "516075",
      dark: "222831",
      contrastText: "#fff"
    },
    background: {
      main: "#EEEEEE",
      light: "f5f6f7",
      dark: "bfbfbf",
      contrastText: "#000"
    }
  },
  typography: {
    fontFamily: "verdana"
  }
});

const root = createRoot(document.getElementById("app"));
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);