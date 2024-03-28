import { useContext, useEffect, useState } from "react";

import data from "../vlaue";
import axios from "axios";
import { AppContext, route } from "../App";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { Link, useSearchParams } from "react-router-dom";
import logo from "../assets/fe.png";
const Register = () => {
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [inviteId, setInviteId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPawword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setLoading } = useContext(AppContext);
  useEffect(() => {
    if (searchParams.get("inviteId")) {
      setInviteId(searchParams.get("inviteId"));
    }
  }, []);
  const handelSubmit = function (e) {
    e.preventDefault();
    setLoading(true);
    const myData = {
      name: name,
      email: email,
      country: country,
      password: password,
      passwordConfirm: confirmPassword,
    };
    if (inviteId) myData.invitor = inviteId;
    axios
      .post(`${route}auth/signup`, JSON.stringify(myData), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.success("Done");
        if (res.data) {
          localStorage.setItem("data", JSON.stringify(res.data.data));
          localStorage.setItem("token", res.data.token);
        }
        nav("/active");
      })
      .catch((err) => {
        if (err?.response?.data?.errors?.length) {
          err?.response?.data?.errors.map((error) => {
            toast.error(error.msg);
          });
        }
      })
      .finally(() => setLoading(false));
    // }
  };
  return (
    <div className="w-full min-h-screen login relative flex items-center justify-center">
      <form
        onSubmit={handelSubmit}
        className="relative z-10 max-w-[1000px] space-y-8"
      >
        <div>
          <label className="font-semibold text-xl block">الاسم :*</label>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="الاسم"
            required
            type="text"
            className="w-full font-semibold text-base sm:w-[500px] focus:outline-none focus:border-b-4 p-4 bg-transparent border-b-2 border-b-mainBorders"
          />
        </div>
        <div>
          <label className="font-semibold text-xl block">
            البريد الالكتروني :*
          </label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="البريد الالكتروني"
            type="email"
            required
            className="w-full font-semibold text-base sm:w-[500px] focus:outline-none focus:border-b-4 p-4 bg-transparent border-b-2 border-b-mainBorders"
          />
        </div>
        <div>
          <label className="font-semibold text-xl block">الدولة :*</label>
          <select
            required
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            className="w-full font-semibold text-base sm:w-[500px] focus:outline-none focus:border-b-4 p-4 bg-transparent border-b-2 border-b-mainBorders"
          >
            {data.map((item) => (
              <option className="bg-main" key={item.value} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-semibold text-xl block">كلمة المرور :*</label>
          <input
            onChange={(e) => {
              setPawword(e.target.value);
            }}
            placeholder="كلمة المرور"
            required
            type="password"
            className="w-full font-semibold text-base sm:w-[500px] focus:outline-none focus:border-b-4 p-4 bg-transparent border-b-2 border-b-mainBorders"
          />
        </div>
        <div>
          <label className="font-semibold text-xl block">
            تاكيد كلمة المرور :*
          </label>
          <input
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            placeholder="كلمة المرور"
            required
            type="password"
            className="w-full font-semibold text-base sm:w-[500px] focus:outline-none focus:border-b-4 p-4 bg-transparent border-b-2 border-b-mainBorders"
          />
        </div>
        <button className="bg-mainText py-4 rounded-full text-main font-semibold text-lg px-6 w-fit block mx-auto">
          تسجيل الدخول
        </button>
        <p className="text-center">
          لديك حساب{" "}
          <Link className="font-semibold" to={"/login"}>
            قم بتسجيل الدخول الان
          </Link>
        </p>
      </form>
      <Link to={"/"} className="absolute block top-0 left-0 w-32 z-10">
        <img src={logo} className="w-fit" />
      </Link>{" "}
      <div className="w-full h-full top-0 right-0 absolute bg-[black] bg-opacity-80" />
    </div>
  );
};

export default Register;
