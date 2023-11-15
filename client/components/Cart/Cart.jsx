import React, { useState, useEffect } from "react";
import Axios from "axios";

// component imports

// MUI imports
import { Container, Box, Typography } from "@mui/material";


const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3000/api/account/orders", {
      params: {
        userId: "b7e93e4f-7da1-4af6-970d-3306f9d4f4c1",
      },
    })
      .then((res) => {
        console.log("Data from Axios:", typeof res.data);
        setCart(res.data.data);
      })
      // .then((data) => setCart(data.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log("Cart state:", ); //just to double check again

  // add to wishlist function
  //add item to wishlist and remove from cart
  const addToWishlist = () => {};

  return (
    <Container maxWidth="lg" sx={{ minWidth: "400px" }}>
      <Typography variant="h5" sx={{ my: 2 }}>
        Cart
      </Typography>
      {cart && cart.length > 0 ? (
        cart.map((item) => (
          <Box key={item.id} sx={{ mb: 2 }}>
            <Typography variant="h6">{item.name}</Typography>
            <Typography>Quantity: {item.quantity}</Typography>
            {/* probably need to add more here ONCE I GET THIS TO WORK */}
          </Box>
        ))
      ) : (
        <Typography>Your cart is empty</Typography>
      )}
    </Container>
  );
  
};

export default Cart;
