import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

// component imports
import Home from "./Home";
import Speakers from "./Products/Speakers";
import SpeakerDetails from "./ProductDetails/SpeakerDetails";
import Headphones from "./Products/Headphones";
import HeadphoneDetails from "./ProductDetails/HeadphoneDetails";
import Earbuds from "./Products/Earbuds";
import EarbudDetails from "./ProductDetails/EarbudDetails";
import Cart from "./Cart/Cart";
import Checkout from "./Cart/Checkout";
import OrderConfirmation from "./Cart/OrderConfirmation";
import Account from "./Account/Account";
import Login from "./Login/Login";
import Register from "./Login/Register";
import Footer from "./Footer";
import NoPathError from "./NoPathError";

// MUI imports
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="sticky" color="common">
        <Container maxWidth="xl" sx={{ minWidth: "400px" }}>
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
              <Link to="/">
                <img
                  src="/images/logo/mach-logo.png"
                  alt="mach-logo"
                  width="75px"
                />
              </Link>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link
                    to="/speakers"
                    style={{ textDecoration: "none", color: "#3c4757" }}
                  >
                    Speakers
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link
                    to="/headphones"
                    style={{ textDecoration: "none", color: "#3c4757" }}
                  >
                    Headphones
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link
                    to="/earbuds"
                    style={{ textDecoration: "none", color: "#3c4757" }}
                  >
                    Earbuds
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link
                    to="/account"
                    style={{ textDecoration: "none", color: "#3c4757" }}
                  >
                    My Account
                  </Link>
                </MenuItem>
              </Menu>
            </Box>

            <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1 }}>
              <Link to="/">
                <img
                  src="/images/logo/mach-logo.png"
                  alt="mach-logo"
                  width="75px"
                />
              </Link>
            </Box>

            {/* layout after medium screen */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block" }}
              >
                <Link
                  to="/speakers"
                  style={{ textDecoration: "none", color: "#3c4757" }}
                >
                  Speakers
                </Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block" }}
              >
                <Link
                  to="/headphones"
                  style={{ textDecoration: "none", color: "#3c4757" }}
                >
                  Headphones
                </Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block" }}
              >
                <Link
                  to="/earbuds"
                  style={{ textDecoration: "none", color: "#3c4757" }}
                >
                  Earbuds
                </Link>
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Link
                to="/cart"
                style={{ textDecoration: "none", color: "#3c4757" }}
              >
                <IconButton sx={{ mr: 2 }}>
                  <Badge badgeContent={4} color="primary">
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                </IconButton>
              </Link>
              <Tooltip title="view account">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link
                    to="/account"
                    style={{ textDecoration: "none", color: "#3c4757" }}
                  >
                    My Account
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" style={{ color: "#3c4757" }}>
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Footer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/speakers" element={<Speakers />}>
          <Route
            path="/speakers/speaker-details"
            element={<SpeakerDetails />}
          />
        </Route>
        <Route path="/headphones" element={<Headphones />}>
          <Route
            path="/headphones/headphone-details"
            element={<HeadphoneDetails />}
          />
        </Route>
        <Route path="/earbuds" element={<Earbuds />}>
          <Route path="/earbuds/earbud-details" element={<EarbudDetails />} />
        </Route>
        <Route path="/cart" element={<Cart />} >
          <Route path="/cart/checkout" element={<Checkout />} >
            <Route path="/cart/checkout/order-confirmation" element={<OrderConfirmation />} />
          </Route>
        </Route>
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<NoPathError />} />
      </Routes>
    </>
  );
};

export default Navbar;
