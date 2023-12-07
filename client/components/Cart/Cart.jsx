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

///////////////////////////////////////////////////
const ItemsCard = ({ item, user, setOpenSnackbar, setSnackbarMessage, getProducts, getCartCount }) => {

  const removeFromCart = (item) => {
    console.log(item);

    // Axios.post(
    //   `http://localhost:3000/api/cart/remove`,
    //   {
    //     orderId: orderId,
    //   },
    //   {
    //     headers: {
    //       "content-type": "application/JSON",
    //     },
    //   }
    // )
    //   .then((res) => {
    //     if (res.status === 200) {
    //       getCart();
    //       setSnackbarMessage("Successfully removed from cart");
    //       setOpenSnackbar(true);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const decrementQty = (item) => {
    // setCount((prevCount) => prevCount > 1 && prevCount - 1);
    console.log("Decrement quantity for item:", item);
  };

  //add item to wishlist and remove from cart
  const addToWishlist = (itemId) => {
    console.log(item);

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

  return (
    <Card key={itemId} sx={{ display: "flex", minWidth: "400px", mb: 2 }}>
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
          <Button onClick={() => addToWishlist(itemId)}>
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
  );
};

//////////////////////////////////////////////////
const Cart = ({ user }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const userId = user && user.id;
    const inCart = true;

    Axios.get(`http://localhost:3000/api/orders/${userId}/${inCart}`)
      .then((res) => setCart(res.data))
      .catch((err) => console.log(err));
  }, [user]);

  const navigate = useNavigate()

  return (
    <Container>
      {cart.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <>
          <Button
            onClick={() => {
              navigate("/cart/checkout");
            }}
          >
            Checkout
          </Button>
          {cart.map((item) => (
            <ItemsCard
              key={item.id}
              item={item}
              user={user}
              // setOpenSnackbar={setOpenSnackbar}
              // setSnackbarMessage={setSnackbarMessage}
              // getProducts={getProducts}
              // getCartCount={getCartCount}
            />

          ))}
        </>
      )}
    </Container>
  );
};

export default Cart;
