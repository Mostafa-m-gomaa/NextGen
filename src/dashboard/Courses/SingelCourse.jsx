import { useContext, useEffect, useState } from "react";

import { AppContext, route } from "../../App";
import DashboardSlide from "../../components/DashboardSlide";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import LessonCard from "../../components/LessonCard";

const SingelCourse = () => {
  const { setLoading } = useContext(AppContext);
  const [lessons, setLessons] = useState([]);
  const [notMine, setNotMine] = useState(false);
  const [data, setData] = useState({});
  const token = localStorage.getItem("token");
  const courseId = useParams().courseId;
  const brok = useParams().bro;
  // const [brok, setBrok] = useState(tr);
  const [isOpen, setIsOpen] = useState(false);
  const [coupon, setCoupon] = useState("");

  useEffect(() => {
    setLoading(true);

    fetch(`${route}education/lessons/relatedLessons/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
     
        if (data?.msg === "you are not allowed to access this course") {
          setNotMine(true);
        }
        if (data.data) {
          setLessons(data.data);
        }
      })
      .finally(() => setLoading(false));
  }, [courseId, token, setLoading]);
  useEffect(() => {
    if (notMine) {
      setLoading(true);
      fetch(`${route}education/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.data);
          setData(res.data);
          
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [notMine, courseId, token]);
  const buyPackCard = () => {
    setLoading(true);
    fetch(`${route}education/orders/checkout-session/${courseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        coupon: coupon,
        productType: "course",
      }),
    })
      .then((res) => res.json())
      .then((red) => {
        if (red?.message) {
          toast.error(red?.message);
        }
        if (red?.status == "success") {
          window.location.href = red?.session?.url;
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
    setLoading(true);
    fetch(`${route}education/orders/coinbase/${courseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        coupon: coupon,
        productType: "course",
      }),
    })
      .then((res) => res.json())
      .then((red) => {
        if (red?.message) {
          toast.error(red?.message);
        }
        if (red?.status == "success") {
          window.location.href = red?.session?.hosted_url;
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div>
      {/* <DashboardSlide /> */}
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
      {notMine && (
        <>
          <h2 className="text-4xl font-semibold text-center my-6">
            انت لا تمتلك هذا الكورس{" "}
          </h2>
          <h4 className="text-2xl font-semibold text-center my-6">
            هل تريد ان تشتري
            <br />
            {data.title} كورس
            <br />
            بسعر {data.price} دولار
          </h4>
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="text-main bg-mainText px-8 text-lg py-3 rounded-xl font-semibold block w-fit mx-auto"
          >
            شراء
          </button>
        </>
      )}
      {!notMine && (
        <>
          {!lessons?.length && (
            <div className="text-lightGray text-4xl my-20 text-center w-full">
              Can not find any lessons in this course
            </div>
          )}
          <h1 className="p-2 md:p-6  m-2  md:m-6 text-2xl bg-lightGold w-fit rounded-xl text-gold">
            Recorded Lessons
          </h1>
          <div className="border border-gray rounded-2xl bg-blackGold p-2 md:p-6  m-2  md:m-6 gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid">
            {lessons.map((lesson, ind) => {
              if (lesson.type === "recorded") {
                return (
                  <LessonCard
                    key={lesson._id}
                    showBroker={ind == 0 && brok == "bro"}
                    lesson={lesson}
                  />
                );
              } else {
                return null;
              }
            })}
          </div>
          <h1 className="p-2 md:p-6  m-2  md:m-6 text-2xl bg-lightGold w-fit rounded-xl text-gold">
            Live Lessons
          </h1>
          <div className="border border-gray rounded-2xl bg-blackGold p-2 md:p-6  m-2  md:m-6 gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid">
            {lessons.map((lesson) => {
              if (lesson.type !== "recorded") {
                return <LessonCard key={lesson._id} lesson={lesson} />;
              } else {
                return null;
              }
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default SingelCourse;
