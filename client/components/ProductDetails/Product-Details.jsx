import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Axios from "axios";

// component imports

// MUI imports
import {
  Container,
  Box,
  Card,
  CardContent,
  CardActions,
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

const ProductDetails = ({ user }) => {
  const [item, setItem] = useState(null);
  const [alsoLikes, setAlsoLikes] = useState([]);
  const [count, setCount] = useState(1);
  const [colors, setColors] = useState(["black", "blue", "red", "gray"]);

  const decrementQty = () => {
    setCount((prevCount) => prevCount > 1 && prevCount - 1);
  };

  const { itemId } = useParams();

  const [isInWishlist, setIsInWishlist] = useState(false);


  useEffect(() => {
    Axios.get(`http://localhost:3000/api/product/${itemId}`)
      .then((res) => {
        setItem(res.data);
        setIsInWishlist(res.data && res.data.orders && res.data.orders[0] && res.data.orders[0].inWishlist);

      })
      .catch((err) => {
        console.log(err);
      });
  }, [itemId]);

  useEffect(() => {
    Axios.post(
      "http://localhost:3000/api/products",
      {
        category: itemId,
      },
      {
        headers: {
          "Content-Type": "application/JSON",
        },
      }
    )
      .then((res) => setAlsoLikes(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log("this is a test from Product-details")

  useEffect(() => {
    //check if in wishlist
    if (item) {
      const inWishlist = item.orders && item.orders.length > 0 && item.orders[0].hasOwnProperty("inWishlist")
        ? item.orders[0].inWishlist
        : false;
      setIsInWishlist(inWishlist);
    }
  }, [item]);
  console.log(count);
  
  const addToCart = () => {
    if (item) {
      Axios.post(
        "http://localhost:3000/api/orders/new",
        {
          userId: user.id,
          productId: item.id,
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
            console.log("Added to cart:", res.data);
          }
        })
        .catch((err) => {
          console.error("Add to cart error:", err);
        });
    }
  };

  const toggleWishlist = () => {
    if (item) {
      if (isInWishlist) {
        removeFromWishlist(item.orders[0].id);

      } else {
        addToWishlist(item.id);
      }
    }
  };

  const addToWishlist = (item) => {
    Axios.post(
      "http://localhost:3000/api/wishlist",
      {
        userId: user.id,
        productId: item.id,
      },
      {
        headers: {
          "content-type": "application/JSON",
        },
      }
    )
      .then((res) => {
        if (res.status === 200) {
          console.log("Added to wishlist:", res.data);
          setIsInWishlist(true);
        }
      })
      .catch((err) => {
        console.error("Add to wishlist error:", err);
      });
  };

  const removeFromWishlist = (orderId) => {
    Axios.post(
      "http://localhost:3000/api/wishlist/remove",
      {
        orderId: orderId,
      },
      {
        headers: {
          "content-type": "application/JSON",
        },
      }
    )
      .then((res) => {
        if (res.status === 200) {
          console.log("Removed from wishlist:", res.data);
          setIsInWishlist(false);
        }
      })
      .catch((err) => {
        console.log("Remove from wishlist error:", err);
      });
  };

  return (
    <Container maxWidth="lg" sx={{ minWidth: "400px", p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "center", md: "start" },
          flexDirection: { xs: "column", md: "row" },
          minWidth: "400px",
          gap: 3,
        }}
      >
        <Box sx={{ width: "50%", minWidth: "400px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              boxSizing: "border-box",
            }}
          >
            <img
              src={item && item.image}
              alt={item && item.name}
              style={{
                width: "100%",
                objectFit: "contain",
                borderRadius: "10px",
              }}
            />
          </Box>
        </Box>

        <Box sx={{ width: { xs: "50%", md: "40%" }, minWidth: "400px" }}>
          <Card sx={{ borderRadius: "10px" }}>
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {item && item.name}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  color="text.secondary"
                  component="div"
                >
                  {item && item.brand}
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary">
                  {item && item.type}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                  p: 4,
                  borderTop: "1px solid",
                  borderColor: "background.main",
                }}
              >
                {colors.map((color) => (
                  <Button key={color}>
                    <Box sx={{ width: 20, height: 20, bgcolor: color }} />
                  </Button>
                ))}
              </Box>

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
                  ${item && item.price}
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
                // checked={item.orders[0] && item.orders[0].inWishlist}
                color="error"
                sx={{ mr: "auto" }}
                onClick={() => toggleWishlist(item.id)}
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
        </Box>
      </Box>

      {/* list of potential products customer could like */}
      <Box
        sx={{
          mt: 5,
          height: 200,
          overflow: "auto",
          whiteSpace: "nowrap",
          borderRadius: "10px",
        }}
      >
        {alsoLikes &&
          alsoLikes.map((item, idx) => (
            <Box
              key={item.id}
              sx={{
                display: "inline-block",
                width: "20%",
                p: 2,
                height: "100%",
                boxSizing: "border-box",
              }}
            >
              <img
                src="./images/logo/mach-logo.png"
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </Box>
          ))}
      </Box>
    </Container>
  );
};

export default ProductDetails;
