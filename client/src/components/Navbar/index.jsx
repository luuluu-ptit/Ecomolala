// import { useState } from "react";
import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthAction from "../../store/actions/auth.action";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Badge,
} from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";

const NavBar = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  console.log(currentUser, "user");
  // console.log(
  //   useSelector((state) => state.auth),
  //   "auth"
  // );

  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(AuthAction.logout());
  }, [dispatch]);

  return (
    <AppBar position="fixed">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit" component="div" padding="10px">
          Become a Seller
        </Typography>
        <Typography sx={{ flexGrow: 1 }}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <FacebookIcon />
          </IconButton>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <InstagramIcon />
          </IconButton>
        </Typography>

        <IconButton color="inherit">
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <Button component={Link} to="/profile" color="inherit">
              {currentUser.shop.name}
            </Button>
            <Button
              component={Link}
              to="/login"
              color="inherit"
              onClick={logOut}
            >
              LogOut
            </Button>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
            <Button component={Link} to="/register" color="inherit">
              Sign Up
            </Button>
          </div>
        )}
      </Toolbar>
      <Toolbar>
        <Typography
          variant="h4"
          color="inherit"
          component={Link}
          to="/"
          underline="none"
          sx={{ flexGrow: 1 }}
        >
          Logo
        </Typography>
        <div sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <IconButton color="inherit" aria-label="search">
            <SearchIcon />
          </IconButton>
          <input
            type="text"
            placeholder="Search"
            sx={{ border: "none", outline: "none", ml: 1 }}
          />
        </div>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <ShoppingCartIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
