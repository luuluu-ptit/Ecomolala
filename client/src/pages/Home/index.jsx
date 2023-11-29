import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import ListProduct from "../../components/products/products";

import ApiService from "../../api/index";

import Cart from "../../store/actions/cart.action";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getProductListCart();
  }, []);

  const getProductListCart = async () => {
    const response = await ApiService.getListCart();
    if (response && response.data) {
      dispatch(Cart.getProductListCart(response.data.metadata));
    }
    // console.log("res detail", res.data.metadata);
  };
  return <ListProduct />;
};

export default HomePage;
