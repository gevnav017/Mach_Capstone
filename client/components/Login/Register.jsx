import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

// component imports

// MUI imports
import { Box, Typography, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const initialError = [
  {
    username: false,
    password: false,
    firstName: false,
    lastName: false,
    incorrectCredentials: false,
    userNotExist: false,
  },
];

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(initialError);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignUp = () => {
    setError(initialError);
    if (!username && !password) {
      setError({ ...error, username: true, password: true });
    } else if (!username) {
      setError({ ...error, username: true });
    } else if (!password) {
      setError({ ...error, password: true });
    }

    if (username && password) {
      Axios.post(
        "http://localhost:3000/api/users/register",
        {
          "content-type": "application/JSON",
        },
        {
          username: username,
          password: password,
          firstName: firstName,
          lastName: lastName,
        }
      )
        .then((res) => res)
        .then((data) => console.log(data))
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column-reverse", md: "row" },
        width: "100%",
        height: {
          xs: "calc(100vh - 56px)",
          sm: "calc(100vh - 64px)",
          md: "calc(100vh - 69px)",
        },
        backgroundImage: "linear-gradient(to right, #3c4757 , #EEEEEE)",
      }}
    >
      <Box
        sx={{
          width: { md: "50%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            bgcolor: "background.main",
            minWidth: { xs: "250px", md: "50%", xl: "500px" },
            boxSizing: "border-box",
            my: { xs: 5, md: 0 },
            blockSize: "fit-content",
            p: 4,
            borderRadius: "10px",
            boxShadow: "20px 20px 20px #3c4757",
            gap: 3,
          }}
        >
          <Typography variant="h5">Sign Up</Typography>

          <FormControl variant="outlined">
            <InputLabel htmlFor="firstName-input">First name</InputLabel>
            <OutlinedInput
              id="firstName-input"
              label="First name"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              error={error.firstName}
            />
          </FormControl>

          <FormControl variant="outlined">
            <InputLabel htmlFor="lastName-input">Last name</InputLabel>
            <OutlinedInput
              id="lastName-input"
              label="Last name"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              error={error.lastName}
            />
          </FormControl>

          <FormControl variant="outlined">
            <InputLabel htmlFor="username-input">Username</InputLabel>
            <OutlinedInput
              id="username-input"
              endAdornment={
                <InputAdornment position="end">
                  <AccountCircle />
                </InputAdornment>
              }
              label="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              error={error.username}
            />
          </FormControl>

          <FormControl variant="outlined">
            <InputLabel htmlFor="password-input">Password</InputLabel>
            <OutlinedInput
              id="password-input"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              error={error.password}
            />
          </FormControl>

          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember me"
          />

          <Button variant="contained" color="primary" onClick={handleSignUp}>
            Sign Up
          </Button>

          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography fontSize="small">Already a member?</Typography>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: { md: "50%" },
          height: { xs: "200px", md: "98%" },
        }}
      >
        <Box id="login-logo">
          <img src="/images/logo/mach-logo.png" alt="mach-logo" />
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
