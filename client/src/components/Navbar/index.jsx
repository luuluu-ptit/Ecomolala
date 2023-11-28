// import { useState } from "react";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AuthAction from "../../store/actions/auth.action";
import ProductList from "../../store/actions/searchProducts.action";
import Cart from "../../store/actions/cart.action";

import ModalCart from "../modal/modalCart";

import { Popover } from "antd";

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
import "./navbar.scss";

import API from "../../api/index";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cartItems, setCartItems] = useState([]);

  const [search, setSearch] = useState("");

  const { user: currentUser } = useSelector((state) => state.auth);
  const { isShop } = useSelector((state) => state.auth);
  const isShopPermission = isShop.includes("SHOP");

  const logOut = useCallback(() => {
    dispatch(AuthAction.logout());
  }, [dispatch]);

  const convertRoleUsertoSeller = useCallback(() => {
    dispatch(AuthAction.convertRoleUsertoSeller());
  }, [dispatch]);

  const handleSearch = useCallback(() => {
    if (search) {
      API.getListSearchProduct(search).then((res) => {
        console.log(res, "successXXXX1");
        dispatch(ProductList.searchProductList(res.data.metadata));
      });
      navigate(`/search/${search}`);
    }
  }, [search, dispatch]);

  // Thêm trạng thái để kiểm tra xem giỏ hàng đã được lấy từ API chưa
  const [isCartFetched, setIsCartFetched] = useState(false);

  // Thêm hàm để gọi API lấy danh sách sản phẩm trong giỏ hàng
  const fetchCartItems = useCallback(async () => {
    // Kiểm tra xem giỏ hàng đã được lấy từ API chưa
    if (!isCartFetched) {
      try {
        const response = await API.getListCart();
        console.log(response, "XXXXXXCart");
        dispatch(Cart.getProductListCart(response.data.metadata));
        setCartItems(response.data.metadata.cart_products);
        setIsCartFetched(true);
      } catch (error) {
        console.error(error);
      }
    }
  }, [isCartFetched]);

  const handleCartHover = () => {
    fetchCartItems();
  };

  return (
    <AppBar className="navbar-main">
      <Toolbar variant="dense">
        {isShopPermission ? (
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            padding="10px"
            style={{ cursor: "pointer" }}
            onClick={async () => {
              navigate("/seller");
            }}
            // to="/seller"
          >
            Store manager
          </Typography>
        ) : (
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            padding="10px"
            style={{ cursor: "pointer" }}
            onClick={async () => {
              await convertRoleUsertoSeller();
              navigate("/seller");
            }}
            // to="/seller"
          >
            Become a Seller
          </Typography>
        )}
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
          sx={{ flexGrow: 1, marginLeft: 1 }}
        >
          Logo
        </Typography>

        <div className="search-item">
          <IconButton
            color="inherit"
            aria-label="search"
            className="search-icon"
            onClick={handleSearch}
          >
            <SearchIcon />
          </IconButton>
          <input
            style={{ padding: "10px" }}
            type="text"
            placeholder="Search for products"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>

        <Popover
          placement="bottom"
          // title=""
          content={<ModalCart cartItems={cartItems} />}
          trigger="hover"
          onVisibleChange={handleCartHover}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCartIcon className="cart-icon" />
          </IconButton>
        </Popover>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
