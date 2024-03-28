import { useContext, useEffect, useState } from "react";

import data from "../vlaue";
import axios from "axios";
import { AppContext, route } from "../App";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import logo from "../assets/fe.png";
import { Link } from "react-router-dom";
const Login = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPawword] = useState("");
  const { setLoading } = useContext(AppContext);

  const handelSubmit = function (e) {
    e.preventDefault();
    setLoading(true);
    // login
    axios
      .post(
        `${route}auth/login`,
        JSON.stringify({
          email,
          password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("Done");
        if (res.data) {
          localStorage.setItem("data", JSON.stringify(res.data.data));
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("id", res.data.data._id);
    
          if(!res.data.data.active){
            nav("/active")
            localStorage.removeItem("active");
                      }
                      else if(!res.data.data.telegram){
                        localStorage.removeItem("token")
                        nav("/telegram-active");
                      }
          else if(res.data.data.active){
     localStorage.setItem("active",res.data.data.active)
     nav("/dashboard");
                      }
        
     
   
        
     
        }
      })
      .catch((err) => {
        console.log(err);
        // toast.error(err.response.data.msg);
        if (err.response.status === 429) toast.error(err.response.data);
        if (err?.response?.status === 401) {
          toast.error("invalid email or password");
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
            البريد الالكتروني :*
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
          <label className="font-semibold text-xl block">كلمة المرور :*</label>
          <input
            onChange={(e) => setPawword(e.target.value)}
            placeholder="كلمة المرور"
            type="password"
            required
            className="w-full font-semibold text-base sm:w-[500px] focus:outline-none focus:border-b-4 p-4 bg-transparent border-b-2 border-b-mainBorders"
          />
        </div>

        <button className="bg-mainText py-4 rounded-full text-main font-semibold text-lg px-6 w-fit block mx-auto">
          تسجيل الدخول
        </button>
        <p className="text-center">
          هل نسيت كلمة المرور ؟{" "}
          <Link className="font-semibold" to={"/resetepassword"}>
            اضغط هنا
          </Link>
        </p>
        <p className="text-center">
          ليس لديك حساب{" "}
          <Link className="font-semibold" to={"/register"}>
            قم بانشاء حساب الان
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

export default Login;
