import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";

// component imports
import useCurrentUser from "./CurrentUser";
import Home from "./Home";
import Speakers from "./Products/Speakers";
// import SpeakerDetails from "./ProductDetails/SpeakerDetails";
import Headphones from "./Products/Headphones";
// import HeadphoneDetails from "./ProductDetails/HeadphoneDetails";
import Earbuds from "./Products/Earbuds";
// import EarbudDetails from "./ProductDetails/EarbudDetails";
import ProductDetails from "./ProductDetails/Product-Details";
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

  // get user logged in
  const user = useCurrentUser();

  const handleLogout = () => {
    handleCloseUserMenu();

    window.localStorage.removeItem("token");
  };

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

  const activeClassStyle = ({ isActive }) => {
    return isActive ? "navLink activeNavLink" : "navLink";
  };

  return (
    <>
      <AppBar position="sticky" color="common">
        <Container maxWidth="xl" sx={{ minWidth: "400px" }}>
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
              <NavLink to="/">
                <img
                  src="/images/logo/mach-logo.png"
                  alt="mach-logo"
                  width="75px"
                />
              </NavLink>
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
                  <NavLink to="/speakers" className={activeClassStyle}>
                    Speakers
                  </NavLink>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <NavLink to="/headphones" className={activeClassStyle}>
                    Headphones
                  </NavLink>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <NavLink to="/earbuds" className={activeClassStyle}>
                    Earbuds
                  </NavLink>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <NavLink to="/cart" className={activeClassStyle}>
                    Cart
                  </NavLink>
                </MenuItem>
                {user && (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <NavLink to="/account" className={activeClassStyle}>
                      My Account
                    </NavLink>
                  </MenuItem>
                )}
              </Menu>
            </Box>

            <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1 }}>
              <NavLink to="/">
                <img
                  src="/images/logo/mach-logo.png"
                  alt="mach-logo"
                  width="75px"
                />
              </NavLink>
            </Box>

            {/* layout after medium screen */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <NavLink to="/speakers" className={activeClassStyle}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: "block", color: "secondary.main" }}
                >
                  Speakers
                </Button>
              </NavLink>
              <NavLink to="/headphones" className={activeClassStyle}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: "block", color: "secondary.main" }}
                >
                  Headphones
                </Button>
              </NavLink>
              <NavLink to="/earbuds" className={activeClassStyle}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: "block", color: "secondary.main" }}
                >
                  Earbuds
                </Button>
              </NavLink>
            </Box>

            <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
              <IconButton sx={{ mr: 2 }}>
                <NavLink to="/cart" className={activeClassStyle}>
                  <Badge badgeContent={4} color="primary">
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                </NavLink>
              </IconButton>

              {user ? (
                <Tooltip title="view account">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user.firstName}
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
              ) : (
                <Box sx={{ display: "flex" }}>
                  <NavLink to="/login" className={activeClassStyle}>
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "secondary.main" }}
                    >
                      Login
                    </Button>
                  </NavLink>
                </Box>
              )}

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
                  <NavLink to="/account" className={activeClassStyle}>
                    My Account
                  </NavLink>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <NavLink to="/" className="navLink">
                    Logout
                  </NavLink>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Footer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/speakers" element={<Speakers />} />
        <Route path="/speakers/product-details/:itemId" element={<ProductDetails />} />
        <Route exact path="/headphones" element={<Headphones />} />
        <Route
          path="/headphones/product-details/:itemId"
          element={<ProductDetails />}
        />
        <Route exact path="/earbuds" element={<Earbuds />} />
        <Route path="/earbuds/product-details/:itemId" element={<ProductDetails />} />
        <Route exact path="/cart" element={<Cart />}>
          <Route path="/cart/checkout" element={<Checkout />}>
            <Route
              path="/cart/checkout/order-confirmation"
              element={<OrderConfirmation />}
            />
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
