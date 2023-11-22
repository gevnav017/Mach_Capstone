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
const CartItems = ({ item }) => {
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
          <CardContent>
            <Typography component="div" variant="h5">
              ${item.products.price}
            </Typography>
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
          <Button onClick={() => addToCart(item.id)}>Add to cart</Button>
          <Button color="error" onClick={() => removeFromWishlist(item.id)}>
            <CloseOutlinedIcon />
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

const Checkout = ({ user }) => {
  const [cart, setCart] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const userId = user && user.id;
    const inCart = true;

    Axios.get(`http://localhost:3000/api/orders/${userId}/${inCart}`)
      .then((res) => setCart(res.data))
      .catch((err) => console.log(err));
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
              cart.map((item) => <CartItems key={item.id} item={item} />)}
          </Box>
          <Paper
            sx={{
              position: "sticky",
              top: 0,
              p: 3,
              width: "20%",
              minWidth: "200px",
            }}
          >
            <Typography gutterBottom>Item Qty</Typography>
            <Typography gutterBottom>Tax</Typography>
            <Typography gutterBottom>Total</Typography>
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
          Stipe payment
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

          <Box>
            Items and total here
          </Box>
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
