import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Axios from "axios";

// component imports
import FilterBar from "../FilterBar";

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

const ItemsCard = ({
  item,
  user,
  setOpenSnackbar,
  setSnackbarMessage,
  getProducts,
  getCartCount,
}) => {
  const [count, setCount] = useState(1);

  const decrementQty = () => {
    setCount((prevCount) => prevCount > 1 && prevCount - 1);
  };

  const toggleWishlist = (speakerId) => {
    if (user) {
      const inWishlist = item.orders && item.orders.length > 0 && item.orders[0].inWishlist;

      if (inWishlist) {
        //if already in wishlist we can remove
        removeFromWishlist(item.orders[0].id);
      } else {
        //if not add it
        addToWishlist(speakerId);
      }
    } else {
      setSnackbarMessage(
        "You must log in or create an account to save your changes"
      );
      setOpenSnackbar(true);
    }
  };

  const addToWishlist = (speakerId) => {
    if (user) {
      Axios.post(
        "https://mach-4zyf.onrender.com/api/wishlist",
        {
          userId: user.id,
          productId: speakerId,
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

  const removeFromWishlist = (orderId) => {
    Axios.post(
      "https://mach-4zyf.onrender.com/api/wishlist/remove",
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
          getProducts();
          setSnackbarMessage("Successfully removed from wishlist");
          setOpenSnackbar(true);
        }
      })
      .catch((err) => {
        setSnackbarMessage("Error: " + err);
        setOpenSnackbar(true);
      });
  };

  const addToCart = (speakerId) => {
    if (user) {
      Axios.post(
        "https://mach-4zyf.onrender.com/api/orders/new",
        {
          userId: user.id,
          productId: speakerId,
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
            getCartCount();
            setSnackbarMessage("Successfully added cart");
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

  const navigate = useNavigate();

  const handleItemDetails = (itemId) => {
    navigate(`/speakers/product-details/${itemId}`);
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: "10px",
          height: "100%",
        }}
      >
        <Box sx={{ width: "100%", height: 300, boxSizing: "border-box" }}>
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
              ${parseFloat(item.price).toFixed(2)}
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
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={
              item.orders && Object.keys(item.orders).length > 0
                ? item.orders[0].inWishlist
                : false
            }
            color="error"
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
    </Grid>
  );
};

const Speakers = ({
  user,
  setOpenSnackbar,
  setSnackbarMessage,
  getCartCount,
}) => {
  const [speakers, setSpeakers] = useState([]);
  const [selectedSpeakers, setSelectedSpeakers] = useState([]);
  const [filteredSpeakers, setFilteredSpeakers] = useState([]);


  useEffect(() => {
    getProducts();
  }, [user]);

  useEffect(() => {
    if (selectedSpeakers.length > 0) {
      setFilteredSpeakers(
        speakers.filter((speaker) => selectedSpeakers.includes(speaker.brand))
      );
    } else {
      setFilteredSpeakers(speakers);
    }
  });

  const getProducts = () => {
    if (user) {
      Axios.post(
        "https://mach-4zyf.onrender.com/api/productsWithUser",
        {
          userId: user && user.id,
          category: "Speaker",
        },
        {
          headers: {
            "Content-Type": "application/JSON",
          },
        }
      )
        .then((res) => setSpeakers(res.data))
        .catch((err) => {
          console.log(err);
        });
    } else {
      Axios.get(
        "https://mach-4zyf.onrender.com/api/products",
        {
          category: "Speaker",
        },
        {
          headers: {
            "Content-Type": "application/JSON",
          },
        }
      )
        .then((res) => setSpeakers(res.data))
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const newerBrandlist = speakers.reduce((brands, speaker) => {
    if (brands.includes(speaker.brand)) {
      return brands;
    }
    return [...brands, speaker.brand];
  }, []);
  return (
    <Container maxWidth="lg" sx={{ minWidth: "400px", p: 3 }}>
      <div 
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
       >
      <Typography variant="h5" sx={{ my: 2 }}>
        Speakers
      </Typography>
      <FilterBar
        brandList={newerBrandlist}
        onFilterChange={setSelectedSpeakers}
      />
      </div>

      <Grid container spacing={2}>
        {filteredSpeakers.map((speaker) => (
            <ItemsCard
              key={speaker.id}
              item={speaker}
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

export default Speakers;
