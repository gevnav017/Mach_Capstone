import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Axios from "axios";

// component imports

// MUI imports
import { Container, Box, Typography } from "@mui/material";
import { Button, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

//creating ItemsCard similar to products to loop over in Cart
const ItemsCard = ({
  item,
  user,
  setOpenSnackbar,
  setSnackbarMessage,
  getProducts,
  getCartCount,
}) => {
  const [count, setCount] = useState(); //this is where the quantity from the add to cart needs to be
  // console.log("item", item);

  const decrementQty = () => {
    setCount((prevCount) => prevCount > 1 && prevCount - 1);
  };

  //add to wishlist and remove from cart??
  const addToWishlist = (itemId) => {
    if (user) {
      Axios.post(
        "http://localhost:3000/api/wishlist",
        {
          userId: user.id,
          productId: itemId,
        },
        {
          headers: {
            "content-type": "application/JSON",
          },
        }
      )
        .then((res) => {
          if (res.status === 200) {
            getProducts();
            setSnackbarMessage("Successfully added wishlist");
            setOpenSnackbar(true);
          }
        })
        .catch((err) => {
          setSnackbarMessage("Error: " + err);
          setOpenSnackbar(true);
        });
    } else {
      setSnackbarMessage(
        "You must log in or create an account to save your changes"
      );
      setOpenSnackbar(true);
    }
  };

  const removeFromCart = (item) => {
    console.log(item);
  };

  return (
    <Container>
      <Card key={item.id} sx={{ display: "flex", minWidth: "400px", mb: 2 }}>
        <CardMedia
          component="img"
          sx={{
            width: { xs: "180px", md: "140px" },
            height: "150px",
            objectFit: "contain",
            p: 1,
            height: "100%",
          }}
          image={item.products.image}
        />
        <Grid container>
          <Grid
            item
            xs={12}
            md={5}
            sx={{ display: "flex", alignItems: "center" }}
          >
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
            <Button onClick={() => addToWishlist(item.id)}>
              {" "}
              Add to Wishlist{" "}
            </Button>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <IconButton
                onClick={decrementQty}
                disabled={item.quantity === 1}
                sx={{ color: "primary.main" }}
              >
                <RemoveOutlinedIcon />
              </IconButton>
              <Typography color="text.secondary">{item.quantity}</Typography>
              <IconButton
                // onClick={() => setCount((c) => c + 1)}
                sx={{ color: "primary.main" }}
              >
                <AddOutlinedIcon />
              </IconButton>
              <Typography color="text.secondary">{item.quantity}</Typography>
            </Box>
            <Button color="error" onClick={() => removeFromCart(item)}>
              <CloseOutlinedIcon />
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

/////////////////////////////////////////////
const Cart = ({ user, setOpenSnackbar, setSnackbarMessage, getCartCount }) => {
  const [cart, setCart] = useState([]);
  console.log(cart);

  useEffect(() => {
    const userId = user && user.id;
    const inCart = true;

    Axios.get(`http://localhost:3000/api/orders/${userId}/${inCart}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, [user]);

  return (
    <Container maxWidth="lg" sx={{ minWidth: "400px", p: 3 }}>
      <Typography variant="h5" sx={{ my: 2 }}>
        Your Cart
      </Typography>
      <Grid container spacing={2}>
        {cart &&
          cart.map((item) => (
            <ItemsCard
              key={item.id}
              // item={item}
              user={user}
              setOpenSnackbar={setOpenSnackbar}
              setSnackbarMessage={setSnackbarMessage}
              getProducts={getProducts}
              getCartCount={getCartCount}
            />
          ))}
      </Grid>
    </Container>
  );
};

export default Cart;
