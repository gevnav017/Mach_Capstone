import React, { useState, useEffect } from "react";
import Axios from "axios";

// component imports

// MUI imports
import { Container, Box, Typography } from "@mui/material";


const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3000/api/orders")
    .then((res) => res.data)
    .then((data) => setCart(data))
    .catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <Container maxWidth="lg" sx={{ minWidth: "400px" }}>
      <Typography variant="h5" sx={{ my: 2 }}>
        Cart
      </Typography>
      {Array.isArray(cart) && cart.length > 0 ? (
        cart.map((item) => (
          <Box key={item.id} sx={{ mb: 2 }}>
            <Typography variant="h6">{item.name}</Typography>
            <Typography>Quantity: {item.quantity}</Typography>
            <Typography>Price: ${item.price * item.quantity}</Typography>
            {/* is there more data to add here */}
          </Box>
        ))
      ) : (
        <Typography variant="body1">No items in the cart.</Typography>
      )}
    </Container>
  );
};

export default Cart;
