import React from "react";
import { Routes, Route, Link } from "react-router-dom";

// component imports
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Speakers from "./components/Products/Speakers";
import Headphones from "./components/Products/Headphones";
import Earbuds from "./components/Products/Earbuds";
import Wishlist from "./components/Account/Wishlist";
import Profile from "./components/Account/Profile";
import Logout from "./components/Account/Logout";

// MUI imports
import { Button } from "@mui/material";


const App = () => {
  return (
    <>
      <Link to="/home">Home</Link>
      <Link to="/Speakers">Speakers</Link>
      <Link to="/Headphones"> Headphones</Link>

      <Button color="primary" variant="contained">
        Primary
      </Button>
      <Button color="secondary" variant="contained">
        Secondary
      </Button>
      <Button color="background" variant="contained">
        Background
      </Button>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/speakers" element={<Speakers />} />
        <Route path="/headphones" element={<Headphones />} />
      </Routes>
    </>
  );
};

export default App;
