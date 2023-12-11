import React, { useState, useEffect } from "react";

// component imports

// MUI imports
import { Box, Paper, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const Profile = ({ user }) => {
  console.log(user);

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "50%" }}>
        <Paper sx={{ elevation: 3, m: 2, p: 2, display: "grid", gap: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar sx={{ width: 100, height: 100 }} />
          </Box>
          <Typography variant="h5" component="div">
            Account Information
          </Typography>

          <Typography>{`Name: ${user.firstName} ${user.lastName}`}</Typography>
          <Typography>{"Email:"}</Typography>
          <Typography>{"Date of Birth:"}</Typography>
        </Paper>
      </Box>
      <Box sx={{ width: "50%" }}>
        <Paper sx={{ display: "grid", gap: 2, m: 2, p: 2 }}>
          <Typography variant="h5" component="div">
            Address Book
          </Typography>
          <Typography>Billing Address:</Typography>
          <Typography>Shipping Address:</Typography>
        </Paper>

        <Paper sx={{ m: 2, p: 2 }}>
          <Typography variant="h5" component="div">
            Payment Methods
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignContent: "center",
              gap: 2,
              flexWrap: "wrap",
              my: 2,
            }}
          >
            <CreditCardIcon />
            <Typography>VISA</Typography>
            <Typography>**** 0808</Typography>
            <Typography>EXP: 12/28</Typography>
          </Box>
          <hr />
          <Box
            sx={{
              display: "flex",
              alignContent: "center",
              gap: 2,
              flexWrap: "wrap",
              my: 2,
            }}
          >
            <CreditCardIcon />
            <Typography>MASTERCARD</Typography>
            <Typography>**** 0606</Typography>
            <Typography>EXP: 03/26</Typography>
          </Box>
          <hr />
          <Box
            sx={{
              display: "flex",
              alignContent: "center",
              gap: 2,
              flexWrap: "wrap",
              my: 2,
            }}
          >
            <CreditCardIcon />
            <Typography>AMEX</Typography>
            <Typography>**** 0303</Typography>
            <Typography>EXP: 06/23</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Profile;
