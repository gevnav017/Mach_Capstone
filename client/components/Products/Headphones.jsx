import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Axios from "axios";

// component imports

// MUI imports
import {
  Container,
  Box,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import IconButton from "@mui/material/IconButton";

const ItemsCard = ({ item, user, setOpenSnackbar, setSnackbarMessage }) => {
  const [count, setCount] = useState(1);

  const decrementQty = () => {
    setCount((prevCount) => prevCount > 1 && prevCount - 1);
  };

  const addToWishlist = (headphoneId) => {
    if (user) {
      Axios.post(
        "http://localhost:3000/api/wishlist",
        {
          userId: user.id,
          productId: headphoneId,
        },
        {
          headers: {
            "content-type": "application/JSON",
          },
        }
      )
        .then((res) => {
          if (res.status === 200) {
            setSnackbarMessage("Successfully added to wishlist")
            setOpenSnackbar(true)
          }
        })
        .catch((err) => {
          setSnackbarMessage("Error: " + err)
          setOpenSnackbar(true)
        });
    } else {
      console.log("no user");
    }
  };

  const addToCart = (headphoneId) => {
    if (user) {
      Axios.post(
        "http://localhost:3000/api/orders/new",
        {
          userId: user.id,
          productId: headphoneId,
          quantity: count,
        },
        {
          headers: {
            "content-type": "application/JSON",
          },
        }
      )
        .then((res) => {
          if (res.status === 200) {
            setSnackbarMessage("Successfully added to cart")
            setOpenSnackbar(true)
          }
        })
        .catch((err) => {
          setSnackbarMessage("Error: " + err)
          setOpenSnackbar(true)
        });

    } else {
      console.log("no user")
    }
  };

  //this will be changed to one page for all products (once i get to it)
  const navigate = useNavigate()

  const handleItemDetails = (itemId) => {
    navigate(`/headphones/product-details/${itemId}`)
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ borderRadius: "10px" }}>
        <Box sx={{ width: "100%", height: 240, boxSizing: "border-box" }}>
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              height: "100%",
              p: 1,
              objectFit: "contain",
              boxSizing: "border-box",
            }}
            className="productCardImg"
            image={item.image}
            title={`${item.name} ${item.type}`}
            onClick={() => handleItemDetails(item.id)}
          />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="text.secondary"
            component="div"
          >
            {item.brand}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
            {item.type}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              pt: 4,
              mb: 2,
              borderTop: "1px solid",
              borderColor: "background.main",
            }}
          >
            <Typography gutterBottom variant="h6" component="div">
              ${item.price}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <IconButton
                onClick={decrementQty}
                disabled={count === 1}
                sx={{ color: "primary.main" }}
              >
                <RemoveOutlinedIcon />
              </IconButton>
              <Typography color="text.secondary">{count}</Typography>
              <IconButton
                onClick={() => setCount((c) => c + 1)}
                sx={{ color: "primary.main" }}
              >
                <AddOutlinedIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
        <CardActions>
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={item.orders[0] && item.orders[0].inWishlist}
            color="error"
            sx={{ mr: "auto" }}
            onClick={() => addToWishlist(item.id)}
          />
          <Button
            variant="contained"
            size="small"
            onClick={() => addToCart(item.id)}
          >
            <ShoppingCartOutlinedIcon size="small" sx={{ mr: 1 }} />
            Add to cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

const Headphones = ({ user }) => {
  const [headphones, setHeadphones] = useState([]);

  useEffect(() => {
    Axios.post(
      "http://localhost:3000/api/products",
      {
        userId: user && user.id,
        category: "Headphone",
      },
      {
        headers: {
          "Content-Type": "application/JSON",
        },
      }
    )
      .then((res) => setHeadphones(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  return (
    <Container maxWidth="lg" sx={{ minWidth: "400px", p: 3 }}>
      <Typography variant="h5" sx={{ my: 2 }}>
        Headphones
      </Typography>
      <Grid container spacing={2}>
        {headphones &&
          headphones.map((headphone) => (
            <ItemsCard key={headphone.id} item={headphone} user={user} />
          ))}
      </Grid>
    </Container>
  );
};

export default Headphones;
