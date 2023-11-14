// component imports
import React, { useState, useEffect } from "react";
import Axios from "axios";

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
import IconButton from "@mui/material/IconButton";

//code that I worked on from 11-6 to 11-8//
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const ItemsCard = ({ item }) => {
  const [count, setCount] = useState(1);

  const decrementQty = () => {
    setCount((prevCount) => prevCount > 1 && prevCount - 1);
  };

  const addToWishlist = (headphonesId) => {
    Axios.post(
      "http://localhost:3000/api/account/wishlist",
      {
        userId: "b7e93e4f-7da1-4af6-970d-3306f9d4f4c1",
        productId: headphonesId,
      },
      {
        headers: {
          "content-type": "application/JSON",
        },
      }
    )
      .then((res) => res)
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err);
      });
  };

  const addToCart = (headphonesId) => {
    console.log(headphonesId);
    Axios.post(
      "http://localhost:3000/api/account/orders",
      {
        userId: "b7e93e4f-7da1-4af6-970d-3306f9d4f4c1",
        productId: headphonesId,
        quantity: count,
      },
      {
        headers: {
          "content-type": "application/JSON",
        },
      }
    )
      .then((res) => res)
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ borderRadius: "10px" }}>
        <CardMedia
          component="img"
          sx={{
            height: 140,
            p: 1,
            objectFit: "contain",
            boxSizing: "border-box",
          }}
          image={item.image}
          title={`${item.name} ${item.type}`}
        />
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
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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

///////////////////////////////////////////
const Headphones = () => {
  const [headphones, setHeadphones] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3000/api/headphones")
      .then((res) => res)
      .then((data) => setHeadphones(data.data)) //should this be just data ?? instead of data.data ? idk i am confused
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log("Headphones state:", headphones); //just to double check some things

  return (
    <Container maxWidth="lg" sx={{ minWidth: "400px", p: 3 }}>
      <Typography variant="h5" sx={{ my: 2 }}>
        Headphones
      </Typography>
      <Grid container spacing={2}>
        {headphones &&
          headphones.map((headphones) => (
            <ItemsCard key={headphones.id} item={headphones} />
          ))}
      </Grid>
    </Container>
  );
};

export default Headphones;
