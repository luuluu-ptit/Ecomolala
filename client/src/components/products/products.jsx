import { useEffect, useState } from "react";
import "./product.scss";
import ApiService from "../../api/index.js";
import { useNavigate } from "react-router-dom";
import CategoryProduct from "./category.jsx";

// import { useSelector } from "react-redux";

const ListProduct = () => {
  const [listProduct, setListProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllProduct();
  }, []);

  const fetchAllProduct = async () => {
    const res = await ApiService.findAllProducts();
    console.log("check res", res);
    if (res && res.data) {
      setListProduct(res.data.metadata);
    }
  };

  const handleRedirect = (e, id) => {
    e.preventDefault();
    navigate(`/products/${id}`);
  };

  return (
    <>
      <div className="container">
        <div className="list-category">
          <CategoryProduct />
        </div>
        <h3 style={{ color: "blue" }}>Sản Phẩm Nổi Bật</h3>
        <div className="list-card">
          {listProduct?.map((item, index) => {
            return (
              <div
                className="card-item"
                key={`index-${index}`}
                onClick={(e) => handleRedirect(e, item._id)}
              >
                <a href="" className="card-media">
                  <img src={item.product_thumb} alt="#catdImg" />
                </a>
                <a href="" className="tag-discount">
                  Discount
                </a>
                <h3>
                  <a className="card-title">{item.product_name}</a>
                </h3>
                <p className="card-desc">{item.product_description}</p>
                <a className="card-info">
                  <div className="card-price">{item.product_price}</div>
                  <div className="card-sold">Đã bán 12k</div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ListProduct;
