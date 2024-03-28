import { Navigate, Outlet, useLocation } from "react-router";
import DashHeader from "../components/DashHeader";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import TickerTape from "../components/TradingViewWidget ";
import { AppContext, route } from "../App";
import toast from "react-hot-toast";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSlide from "../components/DashboardSlide";

const DashboardLayout = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const data = JSON.parse(localStorage.getItem("data"));
  const nav = useNavigate();
  const { setLoading } = useContext(AppContext);
  const onActive = () => {
    setLoading(true);
    fetch(`${route}auth/sendVerifyCode`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.succes === "true") {
          toast.success("لقد قمنا بارسال رمز لبريدك الالكتروني");
          console.log(0);
          nav("/active");
        }
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setLoading(false));
  };
  // useEffect(() => {
  //   if (!data?.emailVerified) {
  //     onActive();
  //   }
  //   if (!data?.telegram?.telegramId) {
  //     nav("/telegram-active");
  //     toast.error("يرجى تفعيل الحساب التليجرام");
  //   }
  // }, []);
  if (!token) {
    return <Navigate state={{ from: location }} replace to="/login" />;
  }

  return (
    <>
      <DashHeader />
      {/* <DashboardSlide /> */}
      <div className="container mx-auto pb-8">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default DashboardLayout;
