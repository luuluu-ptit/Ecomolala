import "./cart.scss";

import { useSelector } from "react-redux";

import ImgProduct from "../../assets/banner-4.jpg";
import { Row, Col, Divider, Checkbox, InputNumber, Button } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
const CartPage = () => {
  const { cart_products } = useSelector((state) => state.cartReducer);
  // console.log(cart_products, "cart_productsXX999");

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
              <div key={item.id} className="product-item">
                <Row>
                  <Col span={10}>
                    <Row gutter={[20]}>
                      <Col span={2}>
                        <Checkbox />
                      </Col>
                      <Col span={8}>
                        <div className="media-product">
                          <img src={item.product_thumb} alt="#imgProd" />
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
                        min={1}
                        max={10}
                        defaultValue={1}
                        style={{ width: 200 }}
                        value={item.quantity}
                      />
                    </div>
                  </Col>
                  <Col span={5}>
                    <div className="price-prod">{item.price}</div>
                  </Col>
                  <Col span={3}>
                    <div className="quantity-prod">
                      <DeleteTwoTone twoToneColor="#eb2f96" />
                    </div>
                  </Col>
                </Row>
              </div>
            ))}

            <div className="payment">
              <Row>
                <Col span={18}></Col>
                <Col span={4}>
                  <span>Tổng tiền: 199.999.000</span>
                </Col>
                <Col span={2}>
                  <Button type="primary" danger>
                    Mua hàng
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
