import { useContext, useState } from "react";

import logo from "../assets/fe.png";

import axios from "axios";
import { AppContext, route } from "../App";
import { toast } from "react-hot-toast";

import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const NewPassword = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoading } = useContext(AppContext);

  const handelSubmit = function (e) {
    e.preventDefault();
    axios
      .put(
        `${route}auth/resetPassword`,
        JSON.stringify({
          email,
          newPassword: password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success("Done");
        if (res.data) {
          localStorage.clear();
          nav("/login");
        }
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          toast.error(err?.response?.data?.message);
        }
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
            بريدك الالكتروني :*
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="البريد الالكتروني"
            type="email"
            required
            className="w-full autofill:bg-transparent font-semibold text-base sm:w-[500px] focus:outline-none focus:border-b-4 p-4 bg-transparent border-b-2 border-b-mainBorders"
          />
        </div>
        <div>
          <label className="font-semibold text-xl block">
            كلمة المرور الجديدة :*
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="كلمة المرور"
            type="password"
            required
            className="w-full autofill:bg-transparent font-semibold text-base sm:w-[500px] focus:outline-none focus:border-b-4 p-4 bg-transparent border-b-2 border-b-mainBorders"
          />
        </div>
        <p className="text-center font-semibold">
          قم باضافه كلمه المرور الجديده{" "}
        </p>

        <button className="bg-mainText py-4 rounded-full text-main font-semibold text-lg px-6 w-fit block mx-auto">
          تحديث كلمة المرور{" "}
        </button>
      </form>
      <Link to={"/"} className="absolute block top-0 left-0 w-32 z-10">
        <img src={logo} className="w-fit" />
      </Link>{" "}
      <div className="w-full h-full top-0 right-0 absolute bg-[black] bg-opacity-80" />
    </div>
  );
};

export default NewPassword;
