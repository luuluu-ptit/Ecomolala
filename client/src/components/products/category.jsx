import "./category.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const CategoryProduct = () => {
  const dataCategory = [
    {
      id: 1,
      title: "KING OF GREEDby Ana ",
      price: "$125000",
      category: "Book",
      linkImg:
        "https://cdn.dribbble.com/userupload/11234185/file/original-38ffbd8358c646bc344fea3b19633862.png?resize=1200x800",
    },
    {
      id: 2,
      title: "KING OF GREEDby Ana ",
      price: "$125000",
      category: "Phone",
      linkImg:
        "https://cdn.dribbble.com/userupload/8856564/file/original-b25c039835fd5551dfdd044806a627fb.jpg?resize=1200x900",
    },
    {
      id: 3,
      title: "KING OF GREEDby Ana ",
      price: "$125000",
      category: "Laptop",
      linkImg:
        "https://cdn.dribbble.com/userupload/11239626/file/original-903c61d4db237e614588ab35fc08ad9d.jpg?resize=1200x900",
    },
    {
      id: 4,
      title: "KING OF GREEDby Ana ",
      price: "$125000",
      category: "HeadPhone",
      linkImg:
        "https://cdn.dribbble.com/userupload/11244146/file/original-435e9ebe26a343e252c8d0815467187d.jpg?resize=1200x890",
    },
    {
      id: 5,
      title: "KING OF GREEDby Ana ",
      price: "$125000",
      category: "Book",
      linkImg:
        "https://cdn.dribbble.com/userupload/10758586/file/original-39aacee048ebc6f813a9356540535ed9.jpg?resize=1200x1200",
    },
    {
      id: 6,
      title: "KING OF GREEDby Ana ",
      price: "$125000",
      category: "Book",
      linkImg:
        "https://cdn.dribbble.com/userupload/5142195/file/original-7042874acb31a24cf1ed16380ac16f69.jpg?resize=1024x768",
    },
    {
      id: 7,
      title: "KING OF GREEDby Ana ",
      price: "$125000",
      category: "Book",
      linkImg:
        "https://cdn.dribbble.com/userupload/8117111/file/original-4789f8bfe45d17b93ebb16a363437314.png?resize=1200x900",
    },
    {
      id: 8,
      title: "KING OF GREEDby Ana ",
      price: "$125000",
      category: "Book",
      linkImg:
        "https://cdn.dribbble.com/userupload/9913904/file/original-b5a2497bfbe10c20d7a1cbf7056492e8.jpg?resize=1200x900",
    },
  ];

  const setting = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
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
  return (
    <>
      <div className="category-container">
        <h3 style={{ color: "blue" }}>Danh Mục Sản Phẩm</h3>
        <Slider {...setting}>
          {dataCategory.map((item) => {
            return (
              <div className="category">
                <div className="category-top">
                  <img src={item.linkImg} alt="imgCate" />
                  <h4>{item.title}</h4>
                </div>
                {/* <div className="category-bottom">
                                        <p>{item.category}</p>
                                    </div> */}
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default CategoryProduct;
