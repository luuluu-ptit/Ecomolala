import "./checkout.scss";
import { Row, Col, Divider, Input, Button, Tag, Modal, Collapse } from "antd";
import {
  ShopOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

import ApiService from "../../api/index";
import { useEffect, useState } from "react";
const { Panel } = Collapse;
const CheckoutPage = () => {
  const userAddress = {
    street: "Số 133 Đường Vĩnh Phúc",
    state: "Ba Đình",
    city: "Hà Nội",
  };

  const [inputValue, setInputValue] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  const [shop_discounts, setShop_discounts] = useState([]);
  // const [shop_order_ids, setShop_order_ids] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [order, setOrder] = useState({});
  const [orderFinall, setOrderFinall] = useState({});

  const { cart_products } = useSelector((state) => state.cartReducer);
  const { cartId } = useSelector((state) => state.cartReducer);
  const { _id } = useSelector((state) => state.auth.user.shop);
  const { selectedProducts } = useSelector((state) => state.cartReducer);

  const newCart_products = cart_products.filter((item) =>
    selectedProducts.includes(item.productId)
  );
  // console.log("newCart_products::", newCart_products);

  useEffect(() => {
    reviewCheckout();
  }, [shop_discounts]);

  const getAllDiscountsShop = async (shopId) => {
    try {
      // console.log(shopId, "shopId123456789");
      const response = await ApiService.getAllDiscountByShop(shopId);
      setShop_discounts(response.data.metadata);
    } catch (error) {
      console.error(error);
    }
  };

  const reviewCheckout = async () => {
    // console.log("responseQƯERT0");
    const shop_order_ids = newCart_products?.map((item) => ({
      shopId: item.shopId,
      shop_discounts: shop_discounts,
      item_products: [
        {
          quantity: item.quantity,
          price: item.price,
          productId: item.productId,
        },
      ],
    }));

    console.log(shop_discounts, "shop_discountsLLLXXX");
    try {
      // console.log("responseQƯERT1");
      const response = await ApiService.checkOutReview({
        cartId: cartId,
        userId: _id,
        shop_order_ids,
      });
      if (response) {
        // console.log(response, "responseQƯERT2");
        setOrder(response.data.metadata);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const orderByUser = async () => {
    const shop_order_ids = newCart_products?.map((item) => ({
      shopId: item.shopId,
      shop_discounts: shop_discounts,
      item_products: [
        {
          quantity: item.quantity,
          price: item.price,
          productId: item.productId,
        },
      ],
    }));

    console.log(shop_discounts, "shop_discountsLLLXXX234");
    try {
      // console.log("responseQƯERT1");
      const response = await ApiService.orderByUser({
        cartId: cartId,
        userAddress: userAddress,
        userPayment: {},
        shop_order_ids,
      });
      if (response) {
        // console.log(response, "response::orderByUser");
        setOrderFinall(response.data.metadata);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const showModal = (shopId) => {
    getAllDiscountsShop(shopId);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    setShop_discounts((prev) => [...prev, inputValue]);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showDetail = (discount) => {
    setSelectedDiscount(discount);
    setIsModalVisible(true);
  };

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const formattedDateTime = dateTime.toLocaleString(); // Thay đổi định dạng tùy theo yêu cầu
    return formattedDateTime;
  };

  const [showModalOrder, setShowModalOrder] = useState(false);

  const handleCloseOrder = () => setShowModalOrder(false);
  const handleShowOrder = async () => setShowModalOrder(true);

  // const handleCancelOrder = async (orderId) => {
  //   try {
  //     // console.log("responseQƯERT1");
  //     const response = await ApiService.cancelOrderByUser(orderId);
  //     if (response) {
  //       // console.log(response, "response::orderByUser");
  //       // setOrderFinall(response.data.metadata);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const [expandedPanel, setExpandedPanel] = useState(null);
  return (
    <>
      <div className="checkout-container">
        <div className="checkout-wrapper">
          <div className="checkout-address">
            <Col>
              <Row>
                <h2>Địa chỉ nhận hàng</h2>
              </Row>
              <Row>
                <Col span={6}>
                  <div className="title-address">Konjluu</div>
                  <div className="title-address">0832311201</div>
                </Col>
                <Col span={10}>
                  <div className="title-address">
                    {/* Số 133 Đường Vĩnh Phúc - Ba Đình - Hà Nội */}
                    {userAddress.street} - {userAddress.state} -{" "}
                    {userAddress.city}
                  </div>
                </Col>
                <Col span={5}>
                  <div className="title-address">
                    <Tag bordered={false} color="orange">
                      Mặc định
                    </Tag>
                  </div>
                </Col>
                <Col span={3}>
                  <div className="title-address">
                    <Button>Thay đổi</Button>
                  </div>
                </Col>
              </Row>
            </Col>
          </div>
          <div className="checkout-title">
            <Row>
              <Col span={11}>
                <div className="title-checkout">Sản phẩm</div>
              </Col>
              <Col span={5}>
                <div className="title-checkout">Số lượng</div>
              </Col>
              <Col span={5}>
                <div className="title-checkout">Số tiền</div>
              </Col>
              <Col span={3}>
                <div className="title-checkout">Thao tác</div>
              </Col>
            </Row>
          </div>
          <Divider />
          <div className="">
            {order?.shopOrderIdsNew?.map((shop) => (
              <div className="item-checkout" key={shop.shopId}>
                {/* <Tag bordered={false} color="error" className="shop-name">
                  {shop.shopId}
                </Tag> */}
                {shop.item_products.map((product) => (
                  <div className="list-product-checkout">
                    <Tag
                      bordered={false}
                      color="processing"
                      className="shop-name"
                    >
                      <ShopOutlined /> Cửa Hàng: {product.product_shop_name}
                    </Tag>
                    <Row>
                      <Col span={11}>
                        <Row gutter={[20]}>
                          <Col span={8}>
                            <div>
                              <img
                                className="media-product-checkout"
                                src={product.product_thumb[0]}
                                alt="#imgProd"
                              />
                            </div>
                          </Col>
                          <Col span={12}>
                            <div className="name-prod">{product.name}</div>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={5}>
                        <div className="quantity-prod">{product.quantity}</div>
                      </Col>
                      <Col span={5}>
                        <div className="price-prod">{product.price}</div>
                      </Col>
                      <Col span={3}>
                        <div className="price-prod"></div>
                      </Col>
                    </Row>
                  </div>
                ))}

                <Row>
                  <Col span={21}></Col>
                  <Col span={3}>
                    <Button onClick={() => showModal(shop.shopId)}>
                      Chọn Voucher
                    </Button>
                  </Col>
                </Row>
                <Modal
                  title="Chọn Shop Voucher Code"
                  visible={isModalVisible}
                  onOk={async () => {
                    handleOk();
                  }}
                  onCancel={handleCancel}
                  centered
                  okButtonProps={{ type: "default" }}
                  okText="Áp Dụng"
                  cancelText="Hủy"
                >
                  <Input
                    className="input-style-checkout"
                    placeholder="Nhập mã voucher"
                    style={{ marginBottom: "10px" }}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <p className="title-list-discount">
                    Danh sách Voucher của Shop
                  </p>
                  <Collapse
                    accordion
                    onChange={(key) => setExpandedPanel(key)}
                    expandIcon={({ isActive }) =>
                      isActive ? <CaretUpOutlined /> : <CaretDownOutlined />
                    }
                  >
                    {shop_discounts.map((discount, index) => (
                      <Panel
                        header={"Discount code: " + discount.discount_code}
                        key={index}
                        extra={
                          <Button
                            type="link"
                            onClick={() => showDetail(discount)}
                          >
                            Xem chi tiết
                          </Button>
                        }
                      >
                        <p>
                          <strong>Tên mã giảm giá : </strong>{" "}
                          {discount.discount_name}
                        </p>
                        <p>
                          <strong>Thông tin về mã giảm giá: </strong>{" "}
                          {discount.discount_description}
                        </p>
                        <p>
                          <strong>Loại mã giảm giá: </strong>{" "}
                          {discount.discount_type}
                        </p>
                        <p>
                          <strong>Giá trị mã giảm giá: </strong>{" "}
                          {discount.discount_value}
                        </p>
                        <p>
                          <strong>Giá trị áp dụng tối đa: </strong>{" "}
                          {discount.discount_max_value}
                        </p>
                        <p>
                          <strong>Thời gian bắt đầu: </strong>{" "}
                          {formatDateTime(discount.discount_start_date)}
                        </p>
                        <p>
                          <strong>Thời gian kết thúc: </strong>{" "}
                          {formatDateTime(discount.discount_end_date)}
                        </p>
                        <p>
                          <strong>
                            Số lần áp dụng tối đa trên một người:{" "}
                          </strong>{" "}
                          {discount.discount_max_uses_per_user}
                        </p>
                        <p>
                          <strong>
                            Giá trị đơn hàng trên một sản phẩm tối thiểu:{" "}
                          </strong>{" "}
                          {discount.discount_min_order_value}
                        </p>
                      </Panel>
                    ))}
                  </Collapse>
                </Modal>
              </div>
            ))}
            <div className="payment-checkout">
              <Row>
                <Col span={15}>Phương thức thanh toán</Col>
                <Col span={5}>Thanh toán khi nhận hàng</Col>
                <Col span={4}>
                  <Button>Thay đổi</Button>
                </Col>
              </Row>
              <Divider />

              <Row gutter={[]} style={{ marginTop: "25px" }}>
                <Col span={16}></Col>
                <Col span={8}>
                  <Row gutter={[20, 10]}>
                    <Col span={16}>
                      <span>Tổng tiền:</span>
                    </Col>
                    <Col span={8}>
                      <span>{order?.checkoutOrder?.totalPrice}</span>
                    </Col>
                    <Col span={16}>
                      <span>Tổng discount giảm giá:</span>
                    </Col>
                    <Col span={8}>
                      <span>{order?.checkoutOrder?.totalDiscount}</span>
                    </Col>
                    <Col span={16}>
                      <span>Phí ship:</span>
                    </Col>
                    <Col span={8}>
                      <span>{order?.checkoutOrder?.feeShip}</span>
                    </Col>
                    <Col span={16}>
                      <span>Tổng thanh toán:</span>
                    </Col>
                    <Col span={8}>
                      <span>{order?.checkoutOrder?.totalCheckout}</span>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row style={{ marginTop: "25px" }}>
                <Col span={21}></Col>
                <Col span={3}>
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      orderByUser();
                      handleShowOrder();
                    }}
                  >
                    Đặt hàng
                  </Button>
                  <Modal
                    title="Thông tin đơn hàng"
                    visible={showModalOrder}
                    onOk={handleCloseOrder}
                    // onCancel={() => {
                    //   // handleCancelOrder(orderFinall?.orderId);
                    // }}
                    centered
                    okButtonProps={{ type: "default" }}
                  >
                    <div>
                      <strong>
                        <h3>Thông tin thanh toán</h3>
                      </strong>
                      <p>Tổng giá: {orderFinall?.order_checkout?.totalPrice}</p>
                      <p>
                        Phí vận chuyển: {orderFinall?.order_checkout?.feeShip}
                      </p>
                      <p>
                        Tổng giảm giá:{" "}
                        {orderFinall?.order_checkout?.totalDiscount}
                      </p>
                      <p>
                        Tổng thanh toán:{" "}
                        {orderFinall?.order_checkout?.totalCheckout}
                      </p>
                      <strong>
                        <h3>Thông tin giao hàng</h3>
                      </strong>
                      <p>Đường: {orderFinall?.order_shipping?.street}</p>
                      <p>Thành phố: {orderFinall?.order_shipping?.city}</p>
                      <p>Quận: {orderFinall?.order_shipping?.state}</p>
                      <strong>
                        <h3>Thông tin theo dõi đơn hàng</h3>
                      </strong>
                      <p>Mã theo dõi: {orderFinall?.order_tracking}</p>
                      <h3>Trạng thái đơn hàng</h3>
                      <p>Trạng thái: {orderFinall?.order_status}</p>
                      <strong>
                        <h3>Thời gian tạo và cập nhật đơn hàng</h3>
                      </strong>
                      <p>Tạo vào: {formatDateTime(orderFinall?.createdAt)}</p>
                      <p>
                        Cập nhật vào: {formatDateTime(orderFinall?.updatedAt)}
                      </p>
                    </div>
                  </Modal>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
