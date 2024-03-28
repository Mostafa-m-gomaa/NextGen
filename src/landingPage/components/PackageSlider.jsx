import Slider from "react-slick";
import PackageCard from "./PackageCard";
import arrow from "../../assets/arrow.png";
const PackageSlider = ({ packages }) => {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
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
    <div className=" mx-auto container my-4">
      <Slider {...settings}>
        {packages?.map((item) => (
          <PackageCard key={item?._id} data={item} />
        ))}
      </Slider>
      <div className="flex justify-center gap-10">
        <img
          src={arrow}
          className="h-36 md:h-44 lg:h-48 rotate-180 cursor-pointer"
          onClick={() => {
            document.querySelector(".slick-next")?.click();
          }}
          alt=""
        />
        <img
          src={arrow}
          onClick={() => {
            document.querySelector(".slick-prev")?.click();
          }}
          className="h-36 md:h-44 lg:h-48 cursor-pointer"
          alt=""
        />
      </div>
    </div>
  );
};

export default PackageSlider;
