import { useEffect, useState } from "react";
import "../../components/products/product.scss";
import ApiService from "../../api/index.js";
import { useNavigate } from "react-router-dom";
// import CategoryProduct from "./category.jsx";

import { useSelector } from "react-redux";

import FilterNav from "./FilterNav.jsx";

const ProductSearch = () => {
  const navigate = useNavigate();

  const { products } = useSelector((state) => state.products);
  //   console.log(products, "XXX11111");

  const handleRedirect = (e, id) => {
    e.preventDefault();
    navigate(`/products/${id}`);
  };

  //   const handleFilter = (filter) => {
  //     // Implement your filtering logic here
  //     // For example, you can call a function that filters the listProduct array based on the filter
  //     filterProducts(filter);
  //   };

  return (
    <>
      <div className="container">
        {/* <FilterNav onFilter={handleFilter} /> */}
        <FilterNav />

        <h3 style={{ color: "blue" }}>Sản Phẩm </h3>
        <div className="list-card">
          {products?.map((item, index) => {
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

export default ProductSearch;
