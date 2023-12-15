import "./cart.scss";
import React, { useMemo, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// import ImgProduct from "../../assets/banner-4.jpg";
import { Row, Col, Divider, Checkbox, InputNumber, Button, Tag } from "antd";
import { DeleteTwoTone, ShopOutlined } from "@ant-design/icons";

import Cart from "../../store/actions/cart.action";
import ApiService from "../../api/index";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart_products } = useSelector((state) => state.cartReducer);
  // console.log(cart_products, "cart_productsXX999");
  const totalPrice = useMemo(() => {
    return cart_products?.reduce((totalPrice, item) => {
      return (totalPrice += item.quantity * item.price);
    }, 0);
  }, [cart_products]);

  const hanldeUpdateQuanityProduct = async (newValue, productId) => {
    const shop_order_ids = cart_products?.map((item) => ({
      shopId: item.shopId,
      item_products: [
        {
          quantity: newValue,
          price: item.price,
          shopId: item.shopId,
          old_quantity: item.quantity,
          productId: productId,
        },
      ],
      version: 203,
    }));

    try {
      const response = await ApiService.updateProductQuantity(shop_order_ids);
      //   console.log("res detai123l", response);
      if (response) {
        dispatch(Cart.updateProductListCart(response.data.metadata.metadata));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deletItemCart = async (productId) => {
    console.log("error deleting");
    try {
      // console.log("0000response12345@@");
      const response = await ApiService.deletItemCart(productId);
      // console.log(response, "response12345@@");
      if (response) {
        dispatch(Cart.deletItemCart(productId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleCheckProduct = (productId) => {
    setSelectedProducts((prevSelectedProducts) => {
      if (prevSelectedProducts.includes(productId)) {
        return prevSelectedProducts.filter((id) => id !== productId);
      } else {
        return [...prevSelectedProducts, productId];
      }
    });
  };

  const handleBuy = () => {
    dispatch(Cart.setSelectedProducts(selectedProducts));
    navigate("/checkout");
  };

  return (
    <>
      <div className="cart-container">
        <div className="cart-wrapper">
          <div className="cart-title">
            <Row>
              <Col span={11}>
                <div className="title-name">Sản phẩm</div>
              </Col>
              <Col span={5}>
                <div className="title-name">Số lượng</div>
              </Col>
              <Col span={5}>
                <div className="title-name">Số tiền</div>
              </Col>
              <Col span={3}>
                <div className="title-name">Thao tác</div>
              </Col>
            </Row>
          </div>
          <Divider />
          <div className="list-product">
            {cart_products?.map((item) => (
              <div key={item.productId} className="product-item">
                <Tag bordered={false} color="processing" className="shop-name">
                  <ShopOutlined /> Cửa Hàng: {item.product_shop_name}
                </Tag>
                <Row>
                  <Col span={10}>
                    <Row gutter={[20]}>
                      <Col span={2}>
                        <Checkbox
                          checked={selectedProducts.includes(item.productId)}
                          onChange={() => handleCheckProduct(item.productId)}
                        />
                      </Col>
                      <Col span={8}>
                        <div className="media-product">
                          <img src={item.product_thumb[0]} alt="#imgProd" />
                        </div>
                      </Col>
                      <Col span={14}>
                        <div className="name-prod">{item.name}</div>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={6}>
                    <div className="quantity-prod">
                      <InputNumber
                        min={0}
                        max={100}
                        defaultValue={1}
                        style={{ width: 200 }}
                        value={item.quantity}
                        onChange={(value) =>
                          hanldeUpdateQuanityProduct(value, item.productId)
                        }
                      />
                    </div>
                  </Col>
                  <Col span={5}>
                    <div className="price-prod">{item.price}</div>
                  </Col>
                  <Col span={3}>
                    <button
                      style={{
                        border: "none",
                        cursor: "pointer",
                        backgroundColor: "white",
                      }}
                      className="quantity-prod "
                      onClick={() => deletItemCart(item.productId)}
                    >
                      <DeleteTwoTone twoToneColor="#eb2f96" />
                    </button>
                  </Col>
                </Row>
              </div>
            ))}
          </div>
          <div className="payment">
            <Row>
              <Col span={18}></Col>
              <Col span={4}>
                <span>Tổng tiền: {totalPrice} VNĐ</span>
              </Col>
              <Col span={2}>
                <Button
                  type="primary"
                  danger
                  // onClick={async () => {
                  //   navigate("/checkout");
                  // }}
                  onClick={handleBuy}
                >
                  Mua hàng
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
