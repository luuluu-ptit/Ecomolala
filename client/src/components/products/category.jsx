import "./category.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { useNavigate } from "react-router-dom";

const CategoryProduct = () => {
  const setting = {
    dots: true,
    infinite: false,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const navigate = useNavigate();

  const fetchProducts = async (productType) => {
    navigate(`/category/${productType}`);
  };
  return (
    <>
      <div className="category-container">
        <h2 className="title-category" style={{ color: "blue" }}>
          DANH MỤC SẢN PHẨM
        </h2>
        <Slider className="list-category" {...setting}>
          <div className="category" onClick={() => fetchProducts("Clothing")}>
            <div className="category-top">
              <img
                src="https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="imgCate"
              />
              <div style={{ textAlign: "center", marginTop: 10 }}>
                <h4>Clothing</h4>
              </div>
            </div>
            {/* <div className="category-bottom">
                       <p>{item.category}</p>
                </div> */}
          </div>
          <div
            className="category"
            onClick={() => fetchProducts("Electronics")}
          >
            <div className="category-top">
              <img
                src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="imgCate"
              />
              <div style={{ textAlign: "center", marginTop: 10 }}>
                <h4>Electronics</h4>
              </div>
            </div>
            {/* <div className="category-bottom">
                       <p>{item.category}</p>
                </div> */}
          </div>
          <div className="category" onClick={() => fetchProducts("Furniture")}>
            <div className="category-top">
              <img
                src="https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="imgCate"
              />
              <div style={{ textAlign: "center", marginTop: 10 }}>
                <h4>Furniture</h4>
              </div>
            </div>
            {/* <div className="category-bottom">
                       <p>{item.category}</p>
                </div> */}
          </div>
        </Slider>
      </div>
    </>
  );
};

export default CategoryProduct;
