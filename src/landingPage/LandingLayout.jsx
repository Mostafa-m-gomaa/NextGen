import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import LandingHeader from "../components/LandingHeader";

const LandingLayout = () => {
  return (
    <>
      <LandingHeader />
      <Outlet />
      <Footer />
    </>
  );
};

export default LandingLayout;
