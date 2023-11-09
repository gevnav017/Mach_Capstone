import React, { useState, useEffect } from "react";
import Axios from "axios";

// component imports

// MUI imports
import { Container, Box } from "@mui/material";


const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    Axios.get()
    .then()
    .then()
    .catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <Container maxWidth="lg" sx={{ minWidth: "400px" }}>
      Cart
    </Container>
  );
};

export default Cart;
