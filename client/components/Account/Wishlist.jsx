import React, { useState, useEffect } from "react";
import Axios from "axios";

// component imports
import useCurrentUser from "../CurrentUser";

// MUI imports
import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const Wishlist = ({ user }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const userId = user && user.id;
    Axios.get(`http://localhost:3000/api/wishlist/${userId}`)
      .then((data) => setWishlist(data.data))
      .catch((err) => {
        console.log(err);
      });
  }, [user]);


  // add to cart button function
  // once clicked, add item to cart and remove from wishlist
  const addToCart = (itemId) => {
    console.log(itemId)
  }

  const removeFromWishlist = (itemId) => {
    console.log(itemId)
  }
  
  return (
    <>
      {wishlist &&
        wishlist.map((item) => (
          <Card key={item.id} sx={{ display: "flex", minWidth: "400px", mb: 2 }}>
            <CardMedia
              component="img"
              sx={{
                width: { xs: "180px", md: "140px" },
                height: "150px",
                objectFit: "contain",
                p: 1,
                height: "100%"
              }}
              image={item.products.image}
              alt="earbud"
            />
            <Grid container>
              <Grid item xs={12} md={5} sx={{ display: "flex", alignItems: "center" }}>
                <CardContent>
                  <Typography component="div" variant="h5">
                    {item.products.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {item.products.brand}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {item.products.type}
                  </Typography>
                </CardContent>
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                md={3}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <CardContent>
                  <Typography component="div" variant="h5">
                    ${item.products.price}
                  </Typography>
                </CardContent>
              </Grid>
              <Grid
                item
                xs={12}
                sm={8}
                md={4}
                sx={{
                  display: "flex",
                  justifyContent: { xs: "space-between", sm: "end" },
                  alignItems: "center",
                  p: 2,
                }}
              >
                <Button onClick={() => addToCart(item.id)}>Add to cart</Button>
                <Button color="error" onClick={() => removeFromWishlist(item.id)}>
                  <CloseOutlinedIcon />
                </Button>
              </Grid>
            </Grid>
          </Card>
        ))}
    </>
  );
};

export default Wishlist;
