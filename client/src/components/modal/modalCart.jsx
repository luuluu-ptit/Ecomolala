import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./modalCart.css";

const ModalCart = ({ cartItems }) => {
  console.log(cartItems, "cartItemsQQQQQ");
  const navigate = useNavigate();
  return (
    <div className="modalCart" style={{ zIndex: 1000 }}>
      <div>
        <p className="imgItem-cart">Image</p>
        <p>Name</p>
        <p>Price</p>
        <p>Quantity</p>
      </div>
      {cartItems?.map((item) => (
        <div key={item.id}>
          <img
            src={item.product_thumb}
            alt={item.name}
            className="imgItem-cart"
          />
          <h5>{item.name}</h5>
          <p>{item.price}</p>
          <p>{item.quantity}</p>
        </div>
      ))}
      <button className="buttonCart" onClick={() => navigate("/cart")}>
        Go to the cart
      </button>
    </div>
  );
};

export default ModalCart;
