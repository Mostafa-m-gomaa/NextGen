import { Route, Routes } from "react-router";
import Home from "./landingPage/Home/Home";
import "./App.css";
import "./all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GoogleTranslate from "./components/GoogleTranslate";
import { createContext, useEffect, useState } from "react";
import Login from "./landingPage/Login";
import { Toaster } from "react-hot-toast";
import LoadingSpinner from "./landingPage/components/LoadingSpinner";
import Dashboard from "./dashboard/Dashboard";
import DashboardLayout from "./dashboard/DashboardLayout";
import Active from "./landingPage/Active";
import Store from "./dashboard/Store/Store";
import axios from "axios";
import Analytic from "./dashboard/Analytic";
import Profile from "./dashboard/Profile/Profile";
import Cart from "./dashboard/Cart";
import Courses from "./dashboard/Courses/Courses";
import Packages from "./dashboard/Packages";
import EducationCategories from "./dashboard/Courses/EducationCategories";
import SingelCourse from "./dashboard/Courses/SingelCourse";
import Lives from "./dashboard/Lives";
import ProductPage from "./dashboard/productPage/MainComponent";
import FreeStore from "./dashboard/Store/FreeStore";
import Resetepassword from "./landingPage/Resetpassword";
import Resetecode from "./landingPage/Resetecode";
import NewPassword from "./landingPage/NewPassword";
import Marketing from "./dashboard/markiting/Marketing";
import MarketingTree from "./dashboard/markiting/MarketingTree";
import Register from "./landingPage/Register";
import AboutUs from "./landingPage/AboutUs/Aboutus";
import TeleActive from "./landingPage/TeleActive";
import Aos from "aos";
import "aos/dist/aos.css";
import PostDetails from "./dashboard/PostDetails";
import Blog from "./landingPage/Blog";
import LandingLayout from "./landingPage/LandingLayout";
import LegalAndPrivacy from "./landingPage/LegalAndPrivacy";
import BlogDetails from "./landingPage/BlogDetails";
import Broker from "./dashboard/borker/Broker";
import Weakly from "./dashboard/Weakly";
import CoursePack from "./dashboard/coursePackage";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom/dist";
// *******production
export const route = "https://api.thenewnormal.trade/api/v1/";
// export const route = "https://apiTest.wealthmakers-fx.com/api/v1/";

export const AppContext = createContext();

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const token = localStorage.getItem("token");
  const [transOpen, setTransOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [update, setUpdate] = useState(0);
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "dark");
      document.querySelector("html").setAttribute("data-theme", "dark");
    }

    if (localStorage.getItem("theme") === "light") {
      setTheme("light");
      document.querySelector("html").setAttribute("data-theme", "light");
    }
  }, []);
  useEffect(() => {
    if (token) {
      axios
        .get(`${route}store/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          setCart(res.data.data);
        })
        .catch((err) => {
          if (
            err?.response?.data?.message ===
              "you are not login,please login first" ||
            err?.response?.data?.msg === "token expired"
          ) {
            localStorage.clear();
          }
        });
    }
  }, [update, token]);
  useEffect(() => {
    Aos.init();
    if (token) {
      axios
        .get(`${route}users/getMe`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data.data) {
            localStorage.setItem("data", JSON.stringify(res.data.data));
          }
        });
    }
  }, []);
  return (
    <AppContext.Provider
      value={{
        transOpen,
        theme,
        setTheme,
        setTransOpen,
        loading,
        setLoading,
        cart,
        setCart,
        update,
        setUpdate,
      }}
    >
      <>
        <Helmet>
          <title>The New Normal</title>
          <meta name="description" content="The New Normal" />
        </Helmet>
        {loading && (
          <div className="fixed w-full h-full top-0 right-0 bg-[#000] z-[10000] bg-opacity-75 flex justify-center items-center">
            <LoadingSpinner />
          </div>
        )}
        <div
          className={`fixed flex justify-center items-center bg-opacity-90 z-[1000] bg-[#000] w-full h-full top-0 right-0  ${
            transOpen ? "block" : "hidden"
          }`}
        >
          <div className="relative p-12 rounded-lg bg-blackGold">
            <div
              onClick={() => setTransOpen(false)}
              className="h-10 w-10 border border-gray rounded-full text-gray flex items-center justify-center absolute top-4 right-4 cursor-pointer hover:bg-dark hover:text-[#fff] transition"
            >
              X
            </div>
            <GoogleTranslate />
          </div>
        </div>
        <Toaster />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/active" element={<Active />} />
          <Route path="/telegram-active" element={<TeleActive />} />
          <Route path="/resetepassword" element={<Resetepassword />} />
          <Route path="/resetecode" element={<Resetecode />} />
          <Route path="/newpassword" element={<NewPassword />} />
          <Route path="" element={<LandingLayout />}>
            <Route path="/blog/post-details/:id" element={<BlogDetails />} />
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/legal-and-privecy" element={<LegalAndPrivacy />} />
          </Route>
          <Route path="/analytic" element={<Analytic />} />

          <Route path="" element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/dashboard/post-details/:id"
              element={<PostDetails isInDash={true} />}
            />
            <Route path="/marketing" element={<Marketing myLog={true} />} />
            <Route path="/weakly" element={<Weakly />} />
            <Route path="/marketing/team" element={<MarketingTree />} />
            <Route path="/marketing/log/:id" element={<Marketing />} />
            <Route path="/store" element={<Store />} />
            <Route path="/freestore" element={<FreeStore />} />
            <Route path="/store/:id" element={<ProductPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            {/* <Route path="/education" element={<EducationCategories />} /> */}
            <Route path="/education" element={<CoursePack />} />
            <Route path="/viewPack/:catId" element={<Courses />} />
            <Route
              path="/viewPack/:catId/course/:bro/:courseId"
              element={<SingelCourse />}
            />
            <Route path="/courses" element={<Courses />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/broker" element={<Broker />} />
            <Route path="/lives" element={<Lives />} />
          </Route>
        </Routes>
      </>
    </AppContext.Provider>
  );
}
