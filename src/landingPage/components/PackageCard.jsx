import { Link } from "react-router-dom";

const PackageCard = ({ data }) => {
  return (
    <div className="flex flex-col justify-between gap-4 text-right border min-h-[400px] border-gray h-full mx-2  px-4 pb-4 rounded-2xl">
      <div>
        {" "}
        <h2 className="text-2xl py-3 w-fit ml-auto border-t-gold border-t">
          {data?.title}
        </h2>
        <h3 className="text-2xl font-bold text-gold py-3 border-y border-y-[#ffff] my-2">
          {data?.priceAfterDiscount ? (
            <>
              <del className="text-red mr-2">${data?.price}</del>
              <span>${data?.priceAfterDiscount}</span>
            </>
          ) : (
            <span> ${data?.price}</span>
          )}
        </h3>
        <h2 className="text-base my-3">{data?.description}</h2>
        <div className="flex flex-col gap-4 border-dashed border-b-2 border-b-gray py-2">
          {data?.courses?.length !== 0 && (
            <ul>
              <h3 className="text-lg my-2">Courses</h3>
              {data?.courses?.map((e) => (
                <li
                  key={e._id}
                  className="flex items-center gap-3 justify-end "
                >
                  {e.title}{" "}
                  <span className="block w-4 h-4 bg-gold rounded-full  border-[2px] border-gray outline outline-[1px] outline-gold"></span>
                </li>
              ))}
            </ul>
          )}
          {data?.telegramChannelNames?.length !== 0 && (
            <ul>
              <h3 className="text-lg my-2">Telegram channels</h3>

              {data?.telegramChannelNames?.map((e) => (
                <li key={e} className="flex items-center gap-3 justify-end">
                  {e === "*" ? "جميع قنوات التيلجيرام" : e}
                  <span className="block w-4 h-4 bg-gold rounded-full  border-[2px] border-gray outline outline-[1px] outline-gold"></span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div>
        <Link
          to="/packages"
          className="flex justify-between items-center bg-lightGold px-3 py-2 rounded-xl"
        >
          <div className="w-5 h-5 bg-gold text-dark rounded-full flex items-center justify-center">
            <i className="fa-solid fa-arrow-left text-base"></i>
          </div>
          <span>قم بالشراء</span>
        </Link>
        <Link
          to="/packages"
          className="flex justify-between items-center border-gold text-gold mt-3 border-[1px] px-3 py-2 rounded-xl"
        >
          <div className="w-5 h-5 bg-gold text-dark rounded-full flex items-center justify-center">
            <i className="fa-solid fa-arrow-left text-base"></i>
          </div>
          <span>سجل واحصل علي ميزات مجانية</span>
        </Link>
      </div>
    </div>
  );
};

export default PackageCard;
