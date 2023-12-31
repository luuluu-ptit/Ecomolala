// import "./checkout.scss";
// import ImgCheckout from "../../assets/banner-3.jpg";
// import {
//   Row,
//   Col,
//   Divider,
//   Checkbox,
//   InputNumber,
//   Button,
//   Tag,
//   Modal,
// } from "antd";
// import { DeleteTwoTone } from "@ant-design/icons";

// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import ApiService from "../../api/index";
// import { useEffect, useState } from "react";

// const CheckoutPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [shop_discounts, setShop_discounts] = useState([]);
//   const [shop_order_ids, setShop_order_ids] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const { cart_products } = useSelector((state) => state.cartReducer);
//   const { cartId } = useSelector((state) => state.cartReducer);
//   const { _id } = useSelector((state) => state.auth.user.shop);

//   useEffect(() => {
//     reviewCheckout();
//     getAllDiscountsShop();
//   }, [shop_discounts]);

//   const getAllDiscountsShop = async () => {
//     try {
//       const response = await ApiService.getAllDiscountByShop(shopId);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const reviewCheckout = async () => {
//     const shop_order_ids = cart_products?.map((item) => ({
//       shopId: item.shopId,
//       shop_discounts: shop_discounts,
//       item_products: [
//         {
//           quantity: newValue,
//           price: item.price,
//           productId: productId,
//         },
//       ],
//     }));

//     try {
//       const response = await ApiService.checkOutReview({
//         cartId: cartId,
//         userId: _id,
//         shop_order_ids,
//       });
//       if (response) {
//         // dispatch(Cart.updateProductListCart(response.data.metadata.metadata));
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     setIsModalVisible(false);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };
//   return (
//     <>
//       <div className="checkout-container">
//         <div className="checkout-wrapper">
//           <div className="checkout-address">
//             <Col>
//               <Row>
//                 <h2>Địa chỉ nhận hàng</h2>
//               </Row>
//               <Row>
//                 <Col span={6}>
//                   <div className="title-address">Konjluu</div>
//                   <div className="title-address">0832311201</div>
//                 </Col>
//                 <Col span={10}>
//                   <div className="title-address">
//                     Số 133 Đường Vĩnh Phúc - Ba Đình - Hà Nội
//                   </div>
//                 </Col>
//                 <Col span={5}>
//                   <div className="title-address">
//                     <Tag bordered={false} color="orange">
//                       Mặc định
//                     </Tag>
//                   </div>
//                 </Col>
//                 <Col span={3}>
//                   <div className="title-address">
//                     <Button type="primary">Thay đổi</Button>
//                   </div>
//                 </Col>
//               </Row>
//             </Col>
//           </div>
//           <div className="checkout-title">
//             <Row>
//               <Col span={11}>
//                 <div className="title-checkout">Sản phẩm</div>
//               </Col>
//               <Col span={5}>
//                 <div className="title-checkout">Số lượng</div>
//               </Col>
//               <Col span={5}>
//                 <div className="title-checkout">Số tiền</div>
//               </Col>
//               <Col span={3}>
//                 <div className="title-checkout">Thao tác</div>
//               </Col>
//             </Row>
//           </div>
//           <Divider />
//           <div className="list-product-checkout">
//             <div className="item-checkout">
//               <Tag bordered={false} color="error" className="shop-name">
//                 MenSwear Shop giá rẻ
//               </Tag>
//               <Row>
//                 <Col span={10}>
//                   <Row gutter={[20]}>
//                     <Col span={2}>
//                       <Checkbox />
//                     </Col>
//                     <Col span={8}>
//                       <div className="media-checkout">
//                         <img src={ImgCheckout} alt="#imgProd" />
//                       </div>
//                     </Col>
//                     <Col span={14}>
//                       <div className="name-checkout">
//                         Bộ Đồ Thể Thao Trẻ Trung Năng Động
//                       </div>
//                     </Col>
//                   </Row>
//                 </Col>
//                 <Col span={6}>
//                   <div className="quantity-checkout">
//                     <InputNumber
//                       min={1}
//                       max={10}
//                       defaultValue={3}
//                       style={{ width: 200 }}
//                     />
//                   </div>
//                 </Col>
//                 <Col span={5}>
//                   <div className="price-checkout">185.000</div>
//                 </Col>
//                 <Col span={3}>
//                   <div className="quantity-checkout">
//                     <DeleteTwoTone twoToneColor="#eb2f96" />
//                   </div>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col span={21}></Col>
//                 <Col span={3}>
//                   {/* <Button type="primary" onClick={showModal}>
//                     Chọn Discount
//                   </Button> */}
//                   <Button onClick={showModal}>Chọn Voucher</Button>
//                 </Col>
//               </Row>
//               <Modal
//                 title="Chọn Shop Voucher Code"
//                 visible={isModalVisible}
//                 onOk={handleOk}
//                 onCancel={handleCancel}
//                 style={{
//                   position: "fixed",
//                   bottom: 50,
//                   width: "100%",
//                   margin: 0,
//                   padding: 0,
//                 }}
//               >
//                 <p>Chọn Shop Voucher</p>
//               </Modal>
//             </div>
//             <div className="payment-checkout">
//               <Row>
//                 <Col span={15}>Phương thức thanh toán</Col>
//                 <Col span={6}>Thanh toán khi nhận hàng</Col>
//                 <Col span={3}>
//                   <Button type="primary">Thay đổi</Button>
//                 </Col>
//               </Row>
//               <Divider />

//               <Row gutter={[]} style={{ marginTop: "25px" }}>
//                 <Col span={16}></Col>
//                 <Col span={8}>
//                   <Row gutter={[20, 10]}>
//                     <Col span={16}>
//                       <span>Tổng tiền:</span>
//                     </Col>
//                     <Col span={8}>
//                       <span> 199.999.0</span>
//                     </Col>
//                     <Col span={16}>
//                       <span>Tổng discount giảm giá:</span>
//                     </Col>
//                     <Col span={8}>
//                       <span> 199.999.0</span>
//                     </Col>
//                     <Col span={16}>
//                       <span>Tổng thanh toán:</span>
//                     </Col>
//                     <Col span={8}>
//                       <span> 199.999.0</span>
//                     </Col>
//                   </Row>
//                 </Col>
//               </Row>

//               <Row style={{ marginTop: "25px" }}>
//                 <Col span={21}></Col>
//                 <Col span={3}>
//                   <Button type="primary" danger>
//                     Mua hàng
//                   </Button>
//                 </Col>
//               </Row>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CheckoutPage;
