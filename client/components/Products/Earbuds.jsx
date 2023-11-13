import React, { useState, useEffect } from "react";
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

const ItemsCard = ({ item }) => {
  const [count, setCount] = useState(1);

  const decrementQty = () => {
    setCount((prevCount) => prevCount > 1 ? prevCount - 1 : 1);
  };

  const addToWishlist = (earbudId) => {
    Axios.post(
      "http://localhost:3000/api/account/wishlist",
      {
        userId: "af7c1fe6-d669-414e-b066-e9733f0de7a8",
        productId: earbudId,
      },
      {
        headers: {
          "Content-Type": "application/JSON",
        },
      }
    )
      .then((res) => res)
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err);
      });
  };

  const addToCart = (earbudId) => {
    Axios.post(
      "http://localhost:3000/api/account/orders",
      {
        userId: "af7c1fe6-d669-414e-b066-e9733f0de7a8",
        productId: earbudId,
        quantity: count
      },
      {
        headers: {
          "Content-Type": "application/JSON",
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
              <Button onClick={decrementQty} disabled={count === 1}>
                <RemoveOutlinedIcon />
              </Button>
              <Typography color="text.secondary">{count}</Typography>
              <Button onClick={() => setCount((c) => c + 1)}>
                <AddOutlinedIcon />
              </Button>
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
          <Button variant="contained" size="small" onClick={() => addToCart(item.id)}>
            Add to cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

const Earbuds = () => {
  const [earbuds, setEarbuds] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3000/api/earbuds")
      .then((res) => res)
      .then((data) => setEarbuds(data.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ minWidth: "400px", p: 3 }}>
      <Typography variant="h5" sx={{ my: 2 }}>
        Earbuds
      </Typography>
      <Grid container spacing={2}>
        {earbuds &&
          earbuds.map((earbud) => <ItemsCard key={earbud.id} item={earbud} />)}
      </Grid>
    </Container>
  );
};

export default Earbuds;
