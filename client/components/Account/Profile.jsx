import React, { useState, useEffect } from "react";

// component imports

// MUI imports
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const Profile = ({ user }) => {
  console.log(user);

  return (
    <Stack direction="column" spacing={5}>
      <div className="backgroundImage">
        <Avatar sx={{ width: 56, height: 56 }} />
        <div className="boldHeading">{"ACCOUNT INFORMATION"}</div>
        <div
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "10px",
            marginBottom: "10px",
          }}
        >
          <div>{`Name: ${user.firstName} ${user.lastName}`}</div>
          <div>{"Email:"}</div>
          <div>{"Date of Birth:"}</div>
        </div>
        <hr></hr>

        <div className="boldHeading">{"ADDRESS BOOK"}</div>
        <div
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "10px",
            marginBottom: "10px",
          }}
        >
          <div>{"Billing Address:"}</div>
          <div>{"Shipping Address:"}</div>
        </div>
        <hr></hr>
        <div className="boldHeading">{"PAYMENT METHODS"}</div>
        <div
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "10px",
            marginBottom: "10px",
          }}
        >
          <CreditCardIcon />
          <div>{"VISA: **** 0808  EXP: 12/28"}</div>
          <CreditCardIcon />
          <div>{"MASTERCARD: **** 0606  EXP: 03/26"}</div>
          <CreditCardIcon />
          <div>{"AMEX: **** 0303  EXP: 06/23"}</div>
        </div>
      </div>
    </Stack>
  );
};

export default Profile;
