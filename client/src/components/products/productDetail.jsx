import "./productDetail.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import ImageGallery from "react-image-gallery";
import { IoIosAdd } from "react-icons/io";
import { TbMinus } from "react-icons/tb";
import { Col, Row, InputNumber, Rate } from "antd";

import Cart from "../../store/actions/cart.action";
import ApiService from "../../api/index";
import Comments from "../comments/Comments";
import transformComments from "../comments/utils";

const ProductDetail = () => {
  const parentCommentId = null;
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = params.id;
  // console.log("id params===>", id);

  const [productDetail, setProductDetail] = useState({});
  const [rate, setRate] = useState(1);
  const [currentValue, setCurrentValue] = useState(1);
  //console.log('param=>',id);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    getDetailProduct();
    fetchComments();
  }, [id]);

  const fetchComments = async () => {
    const response = await ApiService.getCommentsByParentComment(
      id,
      parentCommentId
    );
    // console.log(response.data, "responseSSS");
    setComments(transformComments(response.data.metadata));
  };

  const createCommentNode = async () => {
    const response = await ApiService.createComment(
      id,
      content,
      parentCommentId
    );
    // console.log(response.data.metadata, "responseSSS");
    if (response.data.metadata) {
      const newComment = transformComments([
        {
          _id: response.data.metadata._id,
          comment_userName: response.data.metadata.comment_userName,
          comment_content: response.data.metadata.comment_content,
          comment_left: response.data.metadata.comment_left,
          rcomment_right: response.data.metadata.comment_right,
          comment_parentId: response.data.metadata.comment_parentId,
        },
      ]);

      setComments([...comments, newComment]);
      fetchComments();
    } else {
      console.error(
        "response.data.metadata is undefined or not in the expected format"
      );
    }
  };

  const getDetailProduct = async () => {
    const res = await ApiService.findProduct(id);
    if (res && res.data) {
      setProductDetail(res.data.metadata);
      setRate(res.data.metadata.product_ratingsAverage);
    }
    // console.log("res detail", res.data.metadata);
  };

  //console.log(rate);
  // let images = [];
  // if (productDetail) {
  //   images.push({
  //     original: `${productDetail.product_thumb}`,
  //     thumbnail: `${productDetail.product_thumb}`,
  //   });
  //   console.log(images, "images");
  // }
  let images = [];
  if (productDetail && productDetail.product_thumb) {
    images = productDetail.product_thumb.map((thumb) => ({
      original: thumb,
      thumbnail: thumb,
    }));
  }

  const handleChangeValue = (value) => {
    setCurrentValue(+value);
  };

  const handleChangeBtn = (type) => {
    if (type === "MINUS") {
      if (currentValue - 1 <= 0) {
        return;
      } else {
        setCurrentValue(currentValue - 1);
      }
    }
    if (type === "ADD") {
      if (currentValue + 1 > productDetail.product_quantity) {
        return;
      } else {
        setCurrentValue(currentValue + 1);
      }
    }
  };

  const handleAddToCart = async () => {
    const product = {
      productId: productDetail?._id,
      shopId: productDetail?.product_shop,
      quantity: currentValue,
      name: productDetail?.product_name,
      price: productDetail?.product_price,
      productThumb: productDetail?.product_thumb,
    };

    try {
      const response = await ApiService.addProductToCart(product);
      // console.log("res detai123l", response.data.metadata);
      if (response.data.metadata) {
        dispatch(Cart.addProductListCart(response.data.metadata));
        alert("Sản phẩm đã được thêm vào giỏ hàng");
        // navigate.push("/cart");
        navigate("/cart");
        // console.log("res detai123l", response.data.metadata);
      } else {
        alert("Có lỗi xảy ra, vui lòng thử lại");
      }
    } catch (error) {
      console.error(error);
      // alert("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setContent("");
  };

  return (
    <>
      <div className="title-product-detail-container">
        <h1>
          ECOMOLALA | {productDetail?.product_type} |{" "}
          {productDetail?.product_name}
        </h1>
      </div>

      <div className="product-detail-container">
        <Row gutter={[20, 20]}>
          <Col span={12}>
            <div>
              <ImageGallery
                items={images}
                showPlayButton={false}
                showFullscreenButton={false}
                slideOnThumbnailOver={true}
                renderLeftNav={() => <></>}
                renderRightNav={() => <></>}
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="product-detail">
              <div className="title">{productDetail?.product_name}</div>
              <div className="description">
                {productDetail?.product_description}
              </div>
              <div className="total-sold">
                <span className="sold">
                  {productDetail?.product_attributes?.material}
                </span>
                <span className="sold">{productDetail?.product_type}</span>
                <span className="sold">
                  {productDetail?.product_attributes?.brand}
                </span>
                <span className="sold">
                  {`Size: ${productDetail?.product_attributes?.size}`}
                </span>
              </div>
              <span>
                <Rate disabled value={rate} style={{ fontSize: "18px" }} />;
              </span>
              <div className="price">
                {`${productDetail?.product_price} VND`}
              </div>
              <div className="delivery">Miễn phí vận chuyển</div>
              <div className="quantity">
                <span>Số lượng</span>
                <div className="input-quantity">
                  <button onClick={() => handleChangeBtn("MINUS")}>
                    <TbMinus />
                  </button>
                  <input
                    min={1}
                    value={currentValue}
                    style={{ width: "150px" }}
                    onChange={(e) => handleChangeValue(e?.target?.value)}
                  />
                  <button onClick={() => handleChangeBtn("ADD")}>
                    <IoIosAdd />
                  </button>
                </div>
                <span>{`Trên ${productDetail.product_quantity} sản phẩm có sẵn`}</span>
              </div>
              <div className="btn-buy-add">
                <button className="add-btn" onClick={handleAddToCart}>
                  Thêm vào giỏ hàng
                </button>
                <button
                  className="buy-btn"
                  onClick={async () => {
                    navigate("/checkout");
                  }}
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className="shop-container">
        <Row gutter={[20, 20]}>
          <h1 style={{ marginLeft: 15 }}>
            Sản Phẩm của Cửa Hàng :
            <strong>{productDetail?.product_shop_name}</strong>
          </h1>
        </Row>
      </div>

      <div className="shop-container">
        <Row style={{ paddingBottom: 15, marginLeft: 15 }} gutter={[20, 20]}>
          <h1 style={{ display: "block" }}>
            CHI TIẾT SẢN PHẨM <br></br>
            <p style={{ marginTop: 10 }}>
              Danh Mục :{" "}
              <span
                style={{ color: "#007bff", cursor: "pointer" }}
                onClick={async () => {
                  navigate(`/category/${productDetail?.product_type}`);
                }}
              >
                {productDetail?.product_type}
              </span>{" "}
              |{" "}
              <span
                style={{ color: "#007bff", cursor: "pointer" }}
                onClick={async () => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                {productDetail?.product_name}
              </span>
            </p>
          </h1>
          <ul class="list-detail_product">
            <li class="item-detail_product">
              <h2 className="title-item-detail_product">Thương Hiệu</h2>
              <p className="content-item-detail_product">
                {productDetail?.product_attributes?.brand}
              </p>
            </li>
            <li class="item-detail_product">
              <h2 className="title-item-detail_product">Kích Cỡ</h2>
              <p className="content-item-detail_product">
                {productDetail?.product_attributes?.size}
              </p>
            </li>
            <li class="item-detail_product">
              <h2 className="title-item-detail_product">Chất Liệu</h2>
              <p className="content-item-detail_product">
                {productDetail?.product_attributes?.material}
              </p>
            </li>
          </ul>
        </Row>
        <Row
          style={{ paddingTop: 20, paddingBottom: 15, marginLeft: 15 }}
          gutter={[20, 20]}
        >
          <h1>
            MÔ TẢ SẢN PHẨM <br></br>
            <p style={{ marginTop: 10 }}>
              {productDetail?.product_description}
            </p>
          </h1>
        </Row>
      </div>

      <div className="comment-container">
        <Row
          style={{ paddingBottom: 15, marginLeft: 15 }}
          className="comment-list"
          gutter={[20, 20]}
        >
          <h3>ĐÁNH GIÁ CỦA KHÁCH HÀNG</h3>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="my-input"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button
                type="submit"
                onClick={() => {
                  createCommentNode();
                }}
              >
                Add Comment
              </button>
            </form>
          </div>
          <Comments comments={comments} productId={id} />
        </Row>
      </div>
    </>
  );
};

export default ProductDetail;
