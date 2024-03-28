import logo from "../assets/logo.png";
import logoone from "../assets/anotherLogo.png";
import { useContext, useState } from "react";
import ProfileMenu from "./ProfileMenu";
import Sidebar from "./Sidebar";
import { Link, NavLink } from "react-router-dom";
import ThemeChanger from "./ThemeChanger";
import { AppContext } from "../App";
const DashHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useContext(AppContext);
  const links = [
    { label: "الرئيسة", link: "/dashboard" },
    { label: "الدورات", link: "/education" },
    { label: "الباقات", link: "/packages" },
    { label: "البث المباشر", link: "/lives" },
    { label: "تحليلات الأسواق", link: "/analytic" },
    { label: "شركاء النجاح", link: "/marketing" },
    { label: "المتجر", link: "/store" },
  ];
  return (
    <div className="py-2 border-b border-b-gray">
      <div className="container flex items-center justify-between gap-8 px-2 py-3 mx-auto md:px-4">
        <div className="items-center justify-center hidden gap-2 lg:flex">
          <ProfileMenu />
          <ThemeChanger />
        </div>
        <div
          className="cursor-pointer lg:hidden"
          onClick={() => setIsOpen(true)}
        >
          <i className="text-4xl fa-solid fa-bars"></i>
        </div>

        {isOpen && (
          <div className="fixed top-0 left-0 z-20 flex w-full h-full">
            <div className="max-h-screen p-12 overflow-auto bg-main w-fit">
              <button
                className="block mx-auto mb-4 text-4xl w-fit"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
              {theme === "dark" ? (
                <Link to={"/dashboard"}>
                  <img src={logoone} alt="Logo" className="h-24 mx-auto mb-4" />
                </Link>
              ) : (
                <Link to={"/dashboard"}>
                  <img src={logo} alt="Logo" className="h-24 mx-auto mb-4" />
                </Link>
              )}

              <ul className="flex flex-col mb-4  min-w-[200px] gap-4 text-xl font-semibold">
                {links.map((link) => (
                  <li key={link.id}>
                    <NavLink
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      className={({ isActive }) =>
                        `${
                          isActive ? "border-b-gold" : "hover:border-b-gold"
                        } border-b border-mainBorders text-center pb-4 block`
                      }
                      to={link.link}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <ProfileMenu />
              <div
                onClick={() => {
                  setIsOpen(false);
                }}
                className="mx-auto my-2 w-fit"
              >
                <ThemeChanger />
              </div>
            </div>
            <div
              onClick={() => {
                setIsOpen(false);
              }}
              style={{ backdropFilter: "blur(10px)" }}
              className="flex-1 cursor-pointer"
            />
          </div>
        )}
        <ul className="items-center justify-center hidden gap-2 lg:flex">
          {links.map((link, i) => (
            <li key={i}>
              <NavLink
                to={link.link}
                className={({ isActive }) =>
                  `p-1 text-sm rounded-lg  block w-full font-semibold whitespace-nowrap`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        {theme === "dark" ? (
          <Link to={"/dashboard"}>
            <img src={logoone} alt="Logo" className="h-10" />
          </Link>
        ) : (
          <Link to={"/dashboard"}>
            <img src={logo} alt="Logo" className="h-10" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default DashHeader;

// ${
//   isActive ? "bg-gold" : "hover:bg-gold transition-all"
// }
