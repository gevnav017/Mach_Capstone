import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const DialogInputForm = ({ onSubscribe }) => {
  const [data, setData] = useState({ email: "" });
  const [isValid, setIsValid] = useState(true);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
    setIsValid(true); // Reset validation status when the user types
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValidEmail(data.email)) {
      // Only call onSubscribe if the email is valid
      onSubscribe(data.email);
    } else {
      // Handle invalid email case
      setIsValid(false);
      setOpenErrorDialog(true);
    }
  };

  const handleCloseErrorDialog = () => {
    setOpenErrorDialog(false);
  };

  return (
    <>
      <form
        method="post"
        onSubmit={handleSubmit}
        style={{
          marginTop: "15px",
        }}
      >
        <input
          type="email"
          name="email"
          id=""
          onChange={handleChange}
          value={data.email}
          placeholder="Email"
          style={{
            width: "300px",
            height: "30px",
            fontSize: "15px",
          }}
        />
        <button
          type="submit"
          style={{
            color: "white",
            backgroundColor: "#0092CA",
            fontSize: "16px",
            padding: "8px",
            borderRadius: "5px",
            marginLeft: "10px",
            cursor: "pointer",
          }}
        >
          Subscribe
        </button>
      </form>

      {/* This is for the Error Dialog */}
      <Dialog open={openErrorDialog} onClose={handleCloseErrorDialog}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a valid email address
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogInputForm;
