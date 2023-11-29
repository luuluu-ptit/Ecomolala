import "./productDetail.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import ImageGallery from "react-image-gallery";
import { IoIosAdd } from "react-icons/io";
import { TbMinus } from "react-icons/tb";
import { Col, Row, InputNumber, Rate } from "antd";

import Cart from "../../store/actions/cart.action";
import ApiService from "../../api/index";

const ProductDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = params.id;
  console.log("id params===>", id);

  const [productDetail, setProductDetail] = useState({});
  const [rate, setRate] = useState(1);
  const [currentValue, setCurrentValue] = useState(1);
  //console.log('param=>',id);

  useEffect(() => {
    getDetailProduct();
  }, [id]);

  const getDetailProduct = async () => {
    const res = await ApiService.findProduct(id);
    if (res && res.data) {
      setProductDetail(res.data.metadata);
      setRate(res.data.metadata.product_ratingsAverage);
    }
    // console.log("res detail", res.data.metadata);
  };

  //console.log(rate);
  let images = [];
  if (productDetail) {
    images.push({
      original: `${productDetail.product_thumb}`,
      thumbnail: `${productDetail.product_thumb}`,
    });
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
        navigate.push("/cart");
        // console.log("res detai123l", response.data.metadata);
      } else {
        alert("Có lỗi xảy ra, vui lòng thử lại");
      }
    } catch (error) {
      console.error(error);
      // alert("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  return (
    <>
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
    </>
  );
};

export default ProductDetail;
