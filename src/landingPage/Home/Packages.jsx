import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { route } from "../../App";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    axios
      .get(`${route}education/packages?sort=-price`)
      .then((res) => setPackages(res.data.data));
  }, []);
  console.log(packages);
  return (
    <section className="py-16" id="packagesSection">
      <div className="container mx-auto">
        <div className="flex items-center gap-8 my-12">
          <h2 className="w-full text-2xl leading-tight text-start md:text-4xl lg:text-5xl">
            الدورات{" "}
          </h2>

          <Link
            to={"/login"}
            className="flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full whitespace-nowrap group bg-mainText text-main"
          >
            <i className="text-xs transition-all duration-300 group-hover:translate-x-1 fa-solid fa-angle-right"></i>
            <span>ابدا الان</span>
          </Link>
        </div>
        <div className="relative mt-32">
          {packages.map((data, index) =>
            data.type === "course" ? (
              <div
                key={index}
                style={{
                  zIndex: 10 - index,
                  transform: `translateY(${index * 20 - 50}px)`,
                }}
                className="sm:h-[480px] flex sm:flex-row flex-col  items-center gap-4 sm:gap-8 sticky bottom-[-200px] sm:bottom-[50px] mx-auto -translate-y-1 p-8 md:p-16 rounded-lg border border-mainBorders bg-main shadow-lg"
              >
                <img
                  src={data.image}
                  className="sm:w-[45%] max-h-full border-4 rounded-xl border-mainBorders"
                  alt=""
                />{" "}
                <div className="sm:w-[50%]">
                  <h3 className="text-2xl font-semibold md:text-3xl ">
                    {data?.title}
                  </h3>
                  <h3 className="text-2xl font-semibold md:text-3xl ">
                    ${data?.price}
                  </h3>
                  <p className="my-8 text-sm sm:text-base">
                    {data?.description}
                  </p>
                  <h3 className="text-2xl font-semibold md:text-3xl ">
                    Telegram Channels
                  </h3>
                  <div className="chnls">
                    {data.telegramChannelNames.map((item) => {
                      return (
                        <div className="flex items-center gap-4">
                          <i className="text-2xl fab fa-telegram-plane"></i>
                          <span className="text-xl">{item}</span>
                        </div>
                      );
                    })}
                  </div>
                  <Link
                    to={"/login"}
                    className="absolute flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full max-w-fit whitespace-nowrap group bg-mainText text-main left-20 "
                  >
                    <i className="text-xs transition-all duration-300 group-hover:translate-x-1 fa-solid fa-angle-right"></i>
                    <span>ابدا الان</span>
                  </Link>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
      {/* <div
        className="absolute opacity-60 w-[100%] h-[100%] top-[50%]  right-[50%] translate-x-[50%] -translate-y-[50%]"
     
      />
      <div className="container relative z-[1]">
        <div className="flex items-center gap-8 my-12">
          <h2 className="w-full text-2xl leading-tight text-start md:text-4xl lg:text-5xl">
الكورسات          </h2>

          <Link
            to={"/login"}
            className="flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full whitespace-nowrap group bg-mainText text-main"
          >
            <i className="text-xs transition-all duration-300 group-hover:translate-x-1 fa-solid fa-angle-right"></i>
            <span>ابدا الان</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages?.map((item, ind) => (
            <PackageCard key={item._id} ind={ind} data={item} />
          ))}
        </div>
         
      </div> */}
    </section>
  );
};

export default Packages;
