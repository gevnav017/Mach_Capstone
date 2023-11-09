import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";

// component imports
import App from "./App";
import MasonryImageList from "./components/MasonryImageList";

// custom MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#0092CA",
      light: "02aced",
      dark: "0276a3",
      contrastText: "#fff",
    },
    secondary: {
      main: "#3c4757",
      light: "516075",
      dark: "222831",
      contrastText: "#fff",
    },
    background: {
      main: "#EEEEEE",
      light: "f5f6f7",
      dark: "bfbfbf",
      contrastText: "#000",
    },
  },
  typography: {
    fontFamily: "verdana",
  },
});

const root = createRoot(document.getElementById("app"));
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
