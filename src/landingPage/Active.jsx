import { useContext, useState } from "react";

import logo from "../assets/fe.png";
import axios from "axios";
import { AppContext, route } from "../App";
import { toast } from "react-hot-toast";

import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
const Active = () => {
  const nav = useNavigate();
  const [code, setCode] = useState("");

  const { setLoading } = useContext(AppContext);

  const token = localStorage.getItem("token");
  const handelSubmit = function (e) {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        `${route}auth/verifyEmail`,
        JSON.stringify({
          verifyCode: code,
        }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success("Done");
        if (res.data) {
          localStorage.setItem("data", JSON.stringify(res.data.data));
          localStorage.setItem("token", res.data.token);
          nav("/telegram-active");
        }
      })
      .catch((err) => {
        if (err?.response?.status === 500) {
          toast.error("verification code invalid or expired");
        }
      })
      .finally(() => setLoading(false));
  };
  const reSend = function () {
    setLoading(true);
    axios
      .get(`${route}auth/sendVerifyCode`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Done");
        nav("/telegram-active");
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full min-h-screen login relative flex items-center justify-center">
      <form
        onSubmit={handelSubmit}
        className="relative z-10 max-w-[1000px] space-y-8"
      >
        <div>
          <label className="font-semibold text-xl block">
            الرمز المرسل اليك
          </label>
          <input
            onChange={(e) => {
              setCode(e.target.value);
            }}
            placeholder="الرمز"
            required
            type="text"
            className="w-full font-semibold text-base sm:w-[500px] focus:outline-none focus:border-b-4 p-4 bg-transparent border-b-2 border-b-mainBorders"
          />
        </div>
        <button className="bg-mainText py-4 rounded-full text-main font-semibold text-lg px-6 w-fit block mx-auto">
          تسجيل الدخول
        </button>
        <p className="text-center">
          <button onClick={reSend} type="button">
            إعاده ارسال الرمز
          </button>
        </p>
      </form>
      <Link to={"/"} className="absolute block top-0 left-0 w-32 z-10">
        <img src={logo} className="w-fit" />
      </Link>{" "}
      <div className="w-full h-full top-0 right-0 absolute bg-[black] bg-opacity-80" />
    </div>
  );
};

export default Active;
