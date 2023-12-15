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
import Card from "@mui/material/Card";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


const BasicSelect = ({ onTimeRangeChange }) => {
  const [ordersPlaced, setOrdersPlaced] = useState("last3Months");

  const handleChange = (event) => {
    const selectedTimeRange = event.target.value;
    setOrdersPlaced(selectedTimeRange);
    onTimeRangeChange(selectedTimeRange);
  };

  return (
    <Box
      sx={{
        minWidth: "250px",
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

// details drop down
const OrderDetails = ({ name, image, price, quantity }) => {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            variant="h8"
            style={{ color: "#2998e2", fontWeight: "bold" }}
          >
            See Order Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* Add product imgs from orders and name */}
          <div>
            <img
              src={image}
              alt={name}
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
            <Typography>{name}</Typography>
          </div>
          <Typography>Quantity: {quantity}</Typography>
          <Typography>Price: ${price}</Typography>
          <Typography>Total: ${price * quantity}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

const Orders = ({ user }) => {
  // state to hold orders
  const [orders, setOrders] = useState([]);
  console.log(orders);

  // state to track whether orders are loading
  const [loading, setLoading] = useState(true);

  // state to track order dates
  const [selectedTimeRange, setSelectedTimeRange] = useState("last3Months");

  // axios call to get orders that have inCart column false by logged in user from db
  useEffect(() => {
    const userId = user && user.id;
    const apiUrl = `https://mach-4zyf.onrender.com/api/all-orders/${userId}`;

    // check if time range is selected
    const onTimeRangeParam = selectedTimeRange
      ? `?timeRange=${selectedTimeRange}`
      : "";

    Axios.get(apiUrl + onTimeRangeParam)
      .then((res) => {
        const sortedOrders = res.data.sort((a, b) => {
        return new Date(b.dateUpdated) - new Date(a.dateUpdated);
      });
      setOrders(sortedOrders)
    })
      .then(() => setLoading(false));
  }, [user.id, selectedTimeRange]);

  const handleTimeRangeChange = (timeRange) => {
    setSelectedTimeRange(timeRange);
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
        <Typography variant="h5">Order History</Typography>

        <BasicSelect onTimeRangeChange={handleTimeRangeChange} />
      </div>
      {/* Conditional rendering based on the presence of orders */}
      {loading ? (
        <Typography variant="h6">Loading...</Typography>
      ) : orders.length === 0 ? (
        <Typography
          variant="h6"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          NO ORDER HISTORY AVAILABLE
        </Typography>
      ) : (
        <Grid
          container
          spacing={2}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* map through orders state to display all orders from the logged in user */}
          {/* button on each order item to click and view order details...dialog box opens up */}
          {/* Grid to display orders as cards */}

          {orders.map((order) => (
            // <Grid item key={order.id} xs={12} md={5} lg={4}>
            <Grid item key={order.id}>
              {/* <Card sx={{ height: "100%" }}> */}
              <Card
                style={{
                  maxWidth: "98%",
                  marginBottom: "16px",
                }}
              >
                <CardContent
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Display order info */}
                  <Typography variant="h7" gutterBottom>
                    Order Date: {order && order.dateUpdated.slice(0, 10)}
                  </Typography>
                  <Typography variant="h7" gutterBottom style={{marginBottom: "10px"}}>
                    Order #: {order && order.id.slice(0, 8)}
                  </Typography>
                  <OrderDetails
                    image={order.products.image}
                    name={order.products.name}
                    price={order.products.price}
                    quantity={order.quantity}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Orders;
