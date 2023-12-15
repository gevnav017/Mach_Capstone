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

///////////////////////////////////////////////////
const ItemsCard = ({
  item,
  user,
  setOpenSnackbar,
  setSnackbarMessage,
  getCart,
  getCartCount,
}) => {
  const [count, setCount] = useState(item.quantity);

  useEffect(() => {
    getCartCount();
  }, [count]);

  const removeFromCart = (item) => {
    const userId = user && user.id;

    Axios.post(
      `https://mach-4zyf.onrender.com/api/orders/remove/${userId}`,
      {
        userId: userId,
        productId: item.id,
      },
      {
        headers: {
          "content-type": "application/JSON",
        },
      }
    )
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          setSnackbarMessage("Product removed from cart successfully");
          setOpenSnackbar(true);
          getCart();
          getCartCount();
        }
      })
      .catch((err) => {
        setSnackbarMessage("Error removing product from cart");
        setOpenSnackbar(true);
      });
  };

  const incrementQty = (itemId) => {
    setCount((prevCount) => prevCount + 1);

    Axios.post(
      `https://mach-4zyf.onrender.com/api/cartQtyChange`,
      {
        itemId: itemId,
        cartQtyChange: count + 1,
      },
      {
        headers: {
          "content-type": "application/JSON",
        },
      }
    );
  };

  const decrementQty = (itemId) => {
    setCount((prevCount) => prevCount > 1 && prevCount - 1);

    Axios.post(
      `https://mach-4zyf.onrender.com/api/cartQtyChange`,
      {
        itemId: itemId,
        cartQtyChange: count - 1,
      },
      {
        headers: {
          "content-type": "application/JSON",
        },
      }
    );
  };

  //add item to wishlist and remove from cart
  const addToWishlist = (itemId) => {
    const userId = user && user.id;

    Axios.post(
      `https://mach-4zyf.onrender.com/api/cartToWishlist`,
      {
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
          setSnackbarMessage("Successfully added to wishlist");
          setOpenSnackbar(true);
        } else {
          setSnackbarMessage("Something went wrong");
          setOpenSnackbar(true);
        }
      })
      .catch((err) => {
        setSnackbarMessage(err.response.data);
        setOpenSnackbar(true);
      });
  };

  return (
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
              ${parseFloat(item.products.price).toFixed(2)}
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
            Add to Wishlist
          </Button>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <IconButton
              onClick={() => decrementQty(item.id)}
              disabled={count === 1}
              sx={{ color: "primary.main" }}
            >
              <RemoveOutlinedIcon />
            </IconButton>
            <Typography color="text.secondary">{count}</Typography>
            <IconButton
              onClick={() => incrementQty(item.id)}
              sx={{ color: "primary.main" }}
            >
              <AddOutlinedIcon />
            </IconButton>
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
const Cart = ({ user, setSnackbarMessage, setOpenSnackbar, getCartCount }) => {
  const [cart, setCart] = useState([]);

  const getCart = () => {
    const userId = user && user.id;
    const inCart = true;

    Axios.get(`https://mach-4zyf.onrender.com/api/orders/${userId}/${inCart}`)
      .then((res) => setCart(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCart();
  }, [user]);

  const navigate = useNavigate();

  return (
    <Container>
      {cart.length === 0 ? (
        <Typography sx={{ width: "100%", textAlign: "center", mt: 5 }}>
          Your cart is empty
        </Typography>
      ) : (
        <>
          <Box sx={{ my: 3, textAlign: "right" }}>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/cart/checkout");
              }}
            >
              Checkout
            </Button>
          </Box>
          {cart.map((item) => (
            <ItemsCard
              key={item.id}
              item={item}
              user={user}
              setOpenSnackbar={setOpenSnackbar}
              setSnackbarMessage={setSnackbarMessage}
              getCart={getCart}
              getCartCount={getCartCount}
            />
          ))}
        </>
      )}
    </Container>
  );
};

export default Cart;
