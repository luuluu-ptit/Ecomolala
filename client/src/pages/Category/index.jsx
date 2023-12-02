// CategoryPage component
import "./category.scss";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import APIService from "../../api/index";
import CategoryProduct from "../../components/products/category";

const CategoryPage = () => {
  const navigate = useNavigate();
  const { productType } = useParams();
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    const getProductByCategorys = async () => {
      try {
        const response = await APIService.getProductByCategory(productType);
        console.log("check response", response);
        if (response) {
          setListProduct(response.data.metadata);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getProductByCategorys();
  }, [productType]);

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
        <h3 style={{ color: "blue" }}>
          SẢN PHẨM NỔI BẬT |{" "}
          <strong style={{ fontSize: "20px" }}>{productType}</strong>
        </h3>

        {listProduct ? (
          <div className="list-card list-product">
            {listProduct?.map((item, index) => {
              return (
                <div
                  className="card-item"
                  key={`index-${index}`}
                  onClick={(e) => handleRedirect(e, item._id)}
                >
                  <a href="" className="card-media">
                    <img src={item.product_thumb[0]} alt="#catdImg" />
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
                    <div className="card-sold">Sold 12k</div>
                  </a>
                </div>
              );
            })}
          </div>
        ) : (
          <h1 style={{ color: "blue" }}>DANH MUC KHONG CO SAN PHAM</h1>
        )}
      </div>
    </>
  );
};

export default CategoryPage;
