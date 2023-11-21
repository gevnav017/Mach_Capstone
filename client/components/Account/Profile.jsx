import React, { useState, useEffect } from "react";

// component imports

// MUI imports
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import CreditCardIcon from '@mui/icons-material/CreditCard';



const Profile = ({ user }) => {
  console.log(user);

  return (
    <Stack direction="column" spacing={3}>
      <Avatar sx={{ width: 56, height: 56 }} />
      <div class="boldHeading">{"ACCOUNT INFORMATION"}</div>
      <div>{`Name: ${user.firstName} ${user.lastName}`}</div>
      <div>{"Email:"}</div>
      <div>{"Date of Birth:"}</div>
      <hr></hr>
      <div class="boldHeading">{"ADDRESS BOOK"}</div>
      <div>{"Billing Address:"}</div>
      <div>{"Shipping Address:"}</div>
      <hr></hr>
      <div class="boldHeading">{"PAYMENT METHODS"}</div>
      <CreditCardIcon />
      <CreditCardIcon />
    </Stack>
  );
};

export default Profile;
