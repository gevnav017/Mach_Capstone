import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

// component imports
import Home from "./Home";
import Speakers from "./Products/Speakers";
import Headphones from "./Products/Headphones";
import Earbuds from "./Products/Earbuds";
import Cart from "./Cart/Cart";
import Account from "./Account/Account";
import Profile from "./Account/Profile";
import Wishlist from "./Account/Wishlist";
import Orders from "./Account/Orders";
import Login from "./Login/Login";
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
import AdbIcon from "@mui/icons-material/Adb";
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
      <AppBar position="sticky" color="background">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="./home"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              MACH
            </Typography>

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
                    to="/"
                    style={{ textDecoration: "none", color: "#3c4757" }}
                  >
                    Home
                  </Link>
                </MenuItem>
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
                    to="/account/profile"
                    style={{ textDecoration: "none", color: "#3c4757" }}
                  >
                    Account
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              MACH
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block" }}
              >
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "#3c4757" }}
                >
                  Home
                </Link>
              </Button>
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
                    to="/account/profile"
                    style={{ textDecoration: "none", color: "#3c4757" }}
                  >
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link
                    to="/account/wishlist"
                    style={{ textDecoration: "none", color: "#3c4757" }}
                  >
                    Wishlist
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link
                    to="/account/orders"
                    style={{ textDecoration: "none", color: "#3c4757" }}
                  >
                    Orders
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
        <Route path="/speakers" element={<Speakers />} />
        <Route path="/headphones" element={<Headphones />} />
        <Route path="/earbuds" element={<Earbuds />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account/profile" element={<Account />} />
        <Route path="/account/wishlist" element={<Account />} />
        <Route path="/account/orders" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<NoPathError />} />
      </Routes>
    </>
  );
};

export default Navbar;
