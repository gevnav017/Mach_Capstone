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
  const [isInWishlist, setIsInWishlist] = useState(item.orders && item.orders.length > 0 && item.orders[0].inWishlist);
  
  useEffect(() => {
    if (user) {
      //gotta check first to see if present in wishlist because hearts were not populating
      Axios.get(`https://mach-4zyf.onrender.com/api/wishlist/${user.id}`)
        .then((res) => {
          const isInWishlist = res.data.some((wishlistItem) => wishlistItem.productId === item.id);
          setIsInWishlist(isInWishlist);
        })
        .catch((err) => console.log(err));
    }
  }, [user, item.id]);

  const decrementQty = () => {
    setCount((prevCount) => prevCount > 1 && prevCount - 1);
  };

  const toggleWishlist = (earbudId) => {
    if (user) {
  
      if (isInWishlist) {
        //if already in wishlist remove it
        removeFromWishlist(earbudId);
      } else {
        //if not in wishlist add it
        addToWishlist(earbudId);
      }
  
      //want to be able to toggle the button
      setIsInWishlist(!isInWishlist);
    } else {
      setSnackbarMessage("You must log in or create an account to save your changes");
      setOpenSnackbar(true);
    }
  };  

  const addToWishlist = (earbudId) => {
    if (user) {
      Axios.post(
        "https://mach-4zyf.onrender.com/api/wishlist",
        {
          userId: user.id,
          productId: earbudId,
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
          setSnackbarMessage("Error adding to wishlist");
          setOpenSnackbar(true);
        });
    } else {
      setSnackbarMessage("You must log in or create an account to save your changes");
      setOpenSnackbar(true);
    }
  };

  const removeFromWishlist = (earbudId) => {
    if (user) {
      Axios.post(
        "https://mach-4zyf.onrender.com/api/wishlist/remove",
        {
          userId: user.id,
          productId: earbudId,
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
          setSnackbarMessage("Error adding to wishlist" + err);
          setOpenSnackbar(true);
        });
    } else {
      setSnackbarMessage(
        "You must log in or create an account to save your changes"
      );
      setOpenSnackbar(true);
    }
  };

  const addToCart = (earbudId) => {
    if (user) {
      Axios.post(
        "https://mach-4zyf.onrender.com/api/orders/new",
        {
          userId: user.id,
          productId: earbudId,
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
          setSnackbarMessage("Error adding to cart");
          setOpenSnackbar(true);
        });
    } else {
      setSnackbarMessage("You must log in or create an account to save your changes");
      setOpenSnackbar(true);
    }
  };

  const navigate = useNavigate();

  const handleItemDetails = (itemId) => {
    navigate(`/earbuds/product-details/${itemId}`);
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
            checked={isInWishlist}
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

const Earbuds = ({
  user,
  setOpenSnackbar,
  setSnackbarMessage,
  getCartCount,
}) => {
  const [earbuds, setEarbuds] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredEarbuds, setFilteredEarbuds] = useState([]);

  useEffect(() => {
    getProducts();
  }, [user]);

  useEffect(() => {
    if (selectedFilters.length > 0) {
      setFilteredEarbuds(
        earbuds.filter((earbud) => selectedFilters.includes(earbud.brand))
      );
    } else {
      setFilteredEarbuds(earbuds);
    }
  });

  const getProducts = () => {
    if (user) {
      Axios.post(
        "https://mach-4zyf.onrender.com/api/productsWithUser",
        {
          userId: user && user.id,
          category: "Earbud",
        },
        {
          headers: {
            "Content-Type": "application/JSON",
          },
        }
      )
        .then((res) => setEarbuds(res.data))
        .catch((err) => {
          console.log(err);
        });
    } else {
      Axios.get(
        "https://mach-4zyf.onrender.com/api/products",
        {
          category: "Earbud",
        },
        {
          headers: {
            "Content-Type": "application/JSON",
          },
        }
      )
        .then((res) => setEarbuds(res.data))
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const uniqueBrandList = earbuds.reduce((brands, earbud) => {
    if (brands.includes(earbud.brand)) {
      return brands;
    }
    return [...brands, earbud.brand];
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
          Earbuds
        </Typography>
        <FilterBar
          brandList={uniqueBrandList}
          onFilterChange={setSelectedFilters}
        />
      </div>
      <Grid container spacing={2}>
        {filteredEarbuds.map((earbud) => (
          <ItemsCard
            key={earbud.id}
            item={earbud}
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

export default Earbuds;