import React, { useState, useEffect } from "react";
import Axios from "axios";

// component imports

// MUI imports
import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const userId = "af7c1fe6-d669-414e-b066-e9733f0de7a8";
    Axios.get(`http://localhost:3000/api/account/wishlist/${userId}`)
      .then((res) => res)
      .then((data) => setWishlist(data.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);


  // add to wishlist button function
  // once clicked, add item to cart and remove from wishlist
  return (
    <>
      {wishlist &&
        wishlist.map((item, idx) => (
          <Card key={idx} sx={{ display: "flex", minWidth: "400px", mb: 2 }}>
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
              <Grid item xs={12} md={5}>
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
                <Button>Add to cart</Button>
                <Button color="error">
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
