import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Axios from "axios";

// component imports

// MUI imports
import { Container, Box, Grid } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

// cart items component
const CartItems = ({
  item,
  user,
  getCart,
  getCartCount,
  setSnackbarMessage,
  setOpenSnackbar,
}) => {
  const removeFromCart = (itemId) => {
    const userId = user && user.id;

    Axios.post(
      `http://localhost:3000/api/orders/remove/${userId}`,
      {
        userId: userId,
        productId: itemId,
      },
      {
        headers: {
          "content-type": "application/JSON",
        },
      }
    )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setSnackbarMessage("Product removed from cart successfully");
          setOpenSnackbar(true);
          getCart();
          getCartCount();
        }
      })
      .catch((err) => {
        console.log(err);
        setSnackbarMessage("Error removing product from cart");
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
        alt="earbud"
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
          md={3}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <CardContent sx={{ mr: 3 }}>
            <Typography component="div" variant="h5">
              ${parseInt(item.products.price).toFixed(2)}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography color="text.secondary">{item.quantity}</Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            justifyContent: { xs: "space-between", sm: "end" },
            alignItems: "center",
            p: 2,
          }}
        >
          <Button color="error" onClick={() => removeFromCart(item.id)}>
            <CloseOutlinedIcon />
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

const Checkout = ({
  user,
  cartCount,
  getCartCount,
  setOpenSnackbar,
  setSnackbarMessage,
}) => {
  const [cart, setCart] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

  let cartPrices = [];

  cart &&
    cart.map((item) => {
      cartPrices.push(parseInt(item.products.price));
    });

  let cartTotal = 0;

  cartPrices.forEach((price) => {
    cartTotal += price;
  });

  const tax = cartTotal * 0.095;

  const getCart = () => {
    const userId = user && user.id;
    const inCart = true;

    Axios.get(`http://localhost:3000/api/orders/${userId}/${inCart}`)
      .then((res) => setCart(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCart();
    getCartCount();
  }, [user]);

  const steps = [
    {
      label: "Order Details",
      element: (
        <Box
          sx={{
            maxHeight: "calc(100vh - 400px)",
            display: "flex",
            overflow: "auto",
            gap: 2,
          }}
        >
          <Box>
            {cart &&
              cart.map((item) => (
                <CartItems
                  key={item.id}
                  item={item}
                  user={user}
                  setOpenSnackbar={setOpenSnackbar}
                  setSnackbarMessage={setSnackbarMessage}
                  getCartCount={getCartCount}
                  getCart={getCart}
                />
              ))}
          </Box>
          <Paper
            sx={{
              position: "sticky",
              top: 0,
              p: 3,
              width: { xs: "40%", md: "30%" },
            }}
          >
            <Box>
              {cartPrices.map((price, idx) => (
                <Box
                  key={idx}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography gutterBottom>Item {idx + 1}</Typography>
                  <Typography gutterBottom>${price.toFixed(2)}</Typography>
                </Box>
              ))}
              <hr />
              <Box sx={{ textAlign: "right", mt: 3 }}>
                <Typography gutterBottom>Item Qty: {cartCount}</Typography>
                <Typography gutterBottom>Tax: ${tax.toFixed(2)}</Typography>
                <Typography gutterBottom>
                  Total: ${cartTotal.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      ),
    },
    {
      label: "Payment",
      element: (
        <Box
          sx={{
            maxHeight: "calc(100vh - 400px)",
            overflow: "auto",
          }}
        >
          Stripe Payment
        </Box>
      ),
    },
    {
      label: "Order Confirmation",
      element: (
        <Paper
          sx={{
            maxHeight: "calc(100vh - 400px)",
            overflow: "auto",
            p: 3,
          }}
        >
          <Typography gutterBottom variant="h6" component="div">
            Thank you for shopping with us!
          </Typography>
          <Typography gutterBottom variant="subtitle">
            We have recieve your order. Your order confirmation #
            {Math.round(Math.random() * 1000000)}.
          </Typography>

          <Box>Items and total here</Box>
        </Paper>
      ),
    },
  ];

  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    if (activeStep === steps.length - 1) {
      navigate("/");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ minWidth: "400px", p: 3 }}>
      <Box sx={{ py: 2 }}>
        <Button
          onClick={() => {
            navigate("/cart");
          }}
        >
          Back to cart
        </Button>
      </Box>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              {step.element}
              <Box sx={{ my: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1
                      ? "Continue shopping"
                      : "Continue"}
                  </Button>
                  {index < 2 && index !== 0 && (
                    <Button
                      disabled={index === 0}
                      onClick={() => {
                        setActiveStep((prevActiveStep) => prevActiveStep - 1);
                      }}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  )}
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Container>
  );
};

export default Checkout;
