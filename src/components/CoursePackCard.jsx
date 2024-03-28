import { Link } from "react-router-dom";
import App, { AppContext, route } from "../App";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import CoursePack from "../dashboard/coursePackage";

const CoursePackCard = ({ data, ind }) => {
  const { setLoading } = useContext(AppContext);
  const token = localStorage.getItem("token");
  const [coupon, setCoupon] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const colors = ["#1748C1", "#87CEEA", "#FFB607"];

  const buyPackCard = () => {
    setLoading(true);
    fetch(`${route}education/orders/checkout-session/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        coupon: coupon,
      }),
    })
      .then((res) => res.json())
      .then((red) => {
        console.log(red);
        if (red?.message) {
          toast.error(red?.message);
        }
        if (red.status === "success") {
          window.location.href = red.url;
        }
      })
      .catch((err) => {
        if (err?.message) {
          toast.error(err?.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const buyPackCr = () => {
    // setLoading(true);
    // fetch(`${route}education/orders/coinbase/${data._id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify({
    //     coupon: coupon,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((red) => {
    //     console.log(red);
    //     if (red.message) {
    //       toast.error(red?.message);
    //     }
    //    else if (red.status === "success") {
    //       window.location.href = red.url;
    //     }
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
    toast.error("This feature is not available yet");
  };

  return (
    <>
      <div
     
        dir="ltr"
        className=" border border-mainText p-8 rounded-lg  flex flex-col gap-8 justify-between "
      >
        <div className="space-y-8">
          <img src={data.image} className="w-full" alt="" />
          <h3 className="text-2xl font-semibold flex justify-between object-contain">
            <span style={{ color: colors[ind % 4] }}>{data?.title}</span>{" "}
            <span>${data?.price}</span>
          </h3>

          <p className="text-sm">{data?.description}</p>
          <ul>
      
            {/* {data?.courses?.map((coures) => (
              <li
                key={coures._id}
                className="text-lg flex justify-between items-center py-3 border-b border-b-mainBorders"
              >
                {coures?.title}
              </li>
            ))} */}
                <h3 className="text-2xl font-semibold flex justify-between object-contain">
            Telegram Channel
          </h3>
          {data.telegramChannelNames.length == 0 && "لا يوجد قنوات"}
            {data?.telegramChannelNames?.map((channel, ind) => (
              <li
                key={ind}
                className="text-lg flex justify-between items-center py-3 border-b border-b-mainBorders"
              >
                {channel}
              </li>
            ))}
          </ul>
        </div>
        
        
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className="px-8 py-3 rounded-full text-main bg-mainText block w-fit mx-auto text-lg "
        >
          اشتري الان
        </button>
      </div>
      {isOpen && (
        <div
          className="fixed w-full z-10 h-full top-0 right-0 flex items-center justify-center cursor-pointer"
          style={{ backdropFilter: "blur(10px)" }}
          onClick={(e) => {
            if (e.target.classList.contains("fixed")) {
              setIsOpen(false);
            }
          }}
        >
          <div className="bg-main p-8  relative rounded-xl border border-mainBorders cursor-auto">
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className="absolute top-4 right-4 text-xl"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <h2 className="text-center font-semibold text-3xl">شراء الباقة</h2>
            <input
              type="text"
              onChange={(e) => {
                setCoupon(e.target.value);
              }}
              placeholder="كوبون الخصم"
              className="bg-transparent px-4 py-2 my-6 rounded-md border border-mainBorders"
              name=""
              id=""
            />
            <h4 className="text-center font-semibold text-xl">الشراء بواسطة</h4>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={buyPackCard}
                className="text-main bg-mainText px-4 py-2 rounded-xl font-semibold mt-4"
              >
                Card
              </button>
              <button
                onClick={buyPackCr}
                className="text-main bg-mainText px-4 py-2 rounded-xl font-semibold mt-4"
              >
                Crypto
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CoursePackCard;
