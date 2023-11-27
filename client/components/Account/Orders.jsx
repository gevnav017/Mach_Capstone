import React, { useState, useEffect } from "react";
import Axios from "axios";
// component imports

// MUI imports
import { Container } from "@mui/material";
import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

const BasicSelect = () => {
  const [ordersPlaced, setOrdersPlaced] = React.useState("");

  const handleChange = (event) => {
    setOrdersPlaced(event.target.value);
  };

  return (
    <Box
      sx={{
        // minWidth: 120
        width: "250px",
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Show Orders From</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={ordersPlaced}
          label="ordersPlaced"
          onChange={handleChange}
        >
          <MenuItem value="last3Months">Last 3 months</MenuItem>
          <MenuItem value="4To6Months">4 - 6 months</MenuItem>
          <MenuItem value="7To9Months">7 - 9 months</MenuItem>
          <MenuItem value="10To12Months">10 - 12 months</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

const Orders = ({ user }) => {
  // state to hold orders
  const [orders, setOrders] = useState([]);

  // axios call to get orders that have inCart column false by logged in user from db
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await Axios.get(`http://localhost:3000/api/orders`, {
          params: {
            userId: user.id,
            inCart: false,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user.id]);

  // function to add view order details
  const viewOrderDetails = (orderId) => {
    console.log(orderId);
  };

  return (
    <Container maxWidth="lg" sx={{ p: 3 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <h2>Order History</h2>

        <BasicSelect />
      </div>
      {/* map through orders state to display all orders from the logged in user */}
      {/* button on each order item to click and view order details...dialog box opens up */}
      {/* Grid to display orders as cards */}
      <Grid
        container
        spacing={2}
        style={{
          background: "#d8d7d7",
        }}
      >
        {Array.isArray(orders) && orders.length > 0 ? (
          orders.map((order) => (
            <Grid item key={order.id} xs={12} md={5} lg={4}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  {/* Display order info */}
                  <Typography variant="h5" gutterBottom>
                    Order Date {order.date}
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    Order #{order.id}
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    Total: ${order.total}
                  </Typography>
                  {/* Displaying images and product names */}
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        style={{
                          marginRight: "8px",
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                      <Typography variant="body1">
                        {item.product.name}
                      </Typography>
                    </div>
                  ))}
                  <Button onClick={() => viewOrderDetails(order.id)}>
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6">No Orders Available</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Orders;
