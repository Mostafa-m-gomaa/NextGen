import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import logoone from "../assets/anotherLogo.png";
import ThemeChanger from "./ThemeChanger";
import { AppContext } from "../App";
const LandingHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useContext(AppContext);

  const token = localStorage.getItem("token");
  useEffect(() => {
    // add event lestener to make a border bottom on scroll
    window.addEventListener("scroll", () => {
      const nav = document.querySelector(".landingNav");
      if (window.scrollY == 0) {
        nav.classList.remove("scrolled");
      } else {
        nav.classList.add("scrolled");
      }
    });
  }, []);
  const links = [
    { name: "الرئيسية", id: "mainSection", target: "/" },
    { name: "تعرف علينا", id: "aboutUsSection", target: "/about-us" },
    { name: "الخدمات", id: "productsSection", target: "/" },
    { name: "الباقات", id: "coursesSection", target: "/" },
    { name: "الدورات", id: "packagesSection", target: "/" },
    { name: "المدونة", id: "blogSection", target: "/blog" },
  ];
  const scrollToId = (id) => {
    const element = document.getElementById(id);
    // can i make it smooth scroll with long duration?

    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className="sticky top-0 z-50 bg-main landingNav">
        <div className="container flex items-center justify-between mx-auto">
          <div className="items-center justify-center hidden gap-2 lg:flex">
            {!token ? (
              <Link
                to={"/login"}
                className="flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full group bg-mainText text-main"
              >
                <i className="text-xs transition-all duration-300 group-hover:translate-x-1 fa-solid fa-angle-right"></i>
                <span>ابدأ الان</span>
              </Link>
            ) : (
              <Link
                to={"/dashboard"}
                className="flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full group bg-mainText text-main"
              >
                <i className="text-xs transition-all duration-300 group-hover:translate-x-1 fa-solid fa-angle-right"></i>
                <span>اذهب للصفحة الرئيسية</span>
              </Link>
            )}
            <ThemeChanger />
          </div>
          <button
            className="text-4xl lg:hidden"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <ul className="items-center justify-center hidden gap-6 text-sm font-semibold lg:flex">
            {links.map((link) => (
              <li key={link.id}>
                <Link
                  onClick={() => {
                    scrollToId(link.id);
                  }}
                  to={link.target}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          {theme === "dark" ? (
            <Link to={"/"}>
              <img src={logoone} className="h-16" alt="" />
            </Link>
          ) : (
            <Link to={"/"}>
              <img src={logo} className="h-16" alt="" />
            </Link>
          )}
        </div>
        {isOpen && (
          <div className="fixed top-0 left-0 flex w-full h-full">
            <div className="max-h-screen p-12 overflow-auto bg-main w-fit">
              <button
                className="block mx-auto mb-4 text-4xl w-fit"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
              <ul className="flex flex-col mb-4  min-w-[200px] gap-4 text-xl font-semibold">
                {links.map((link) => (
                  <li key={link.id}>
                    <Link
                      className="block pb-4 text-center border-b border-mainBorders"
                      onClick={() => {
                        scrollToId(link.id);
                        setIsOpen(false);
                      }}
                      to={link.target}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                to={"/login"}
                onClick={() => {
                  setIsOpen(false);
                }}
                className="items-center block gap-2 px-6 py-3 mx-auto text-sm font-medium rounded-full group bg-mainText w-fit text-main"
              >
                <i className="text-xs transition-all duration-300 group-hover:translate-x-1 fa-solid fa-angle-right"></i>
                <span>ابدأ الان</span>
              </Link>
              <div
                onClick={() => {
                  setIsOpen(false);
                }}
                className="mx-auto my-4 w-fit"
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
      </div>
      {/* <EconomicCalendar /> */}
    </>
  );
};

export default LandingHeader;
