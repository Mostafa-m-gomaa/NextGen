import { Link } from "react-router-dom";

const ProductCard = ({ data, isOdd }) => {
  return (
    <div id={data.id} className={`py-8 ${!isOdd ? "bg-blackGold " : ""}`}>
      <div
        className={`${
          isOdd ? "" : " lg:flex-row-reverse"
        } flex flex-col-reverse lg:flex-row container mx-auto items-center justify-center`}
      >
        <div className="lg:w-[50%] mx-4 productBg min-h-[500px]">
          <h2 className="text-3xl font-semibold my-8 text-gold text-center lg:text-right">
            <span className="text-4xl ml-3 ">:</span>
            {data.label}
          </h2>
          <p className="text-xl py-6 ">{data.desc}</p>
          <Link
            to="/login"
            className="px-10 py-3 mx-auto text-xl border border-gold hover:text-dark hover:bg-gold transition-all text-gold bg-dark rounded-xl my-8 block w-fit"
          >
            ابدء الأن
          </Link>
        </div>
        <div className="lg:w-[50%] ">
          <img
            className="max-w-[400px] mx-auto"
            src={data.productImage}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
