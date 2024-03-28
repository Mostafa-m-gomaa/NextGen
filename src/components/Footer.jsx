import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import tradingLogo from "../assets/tradingLogo.jpg";
const Footer = () => {
  /* telegram twit goog inst tic */
  const media = [
    {
      icon: "fa-brands fa-telegram",
      link: "https://t.me/THENNOFFICIAL",
    },

    {
      icon: "fa-brands fa-twitter",
      link: "https://twitter.com/thennofficial_?s=21&t=S9-Iu6WGyJf6XsoVClM8Lw",
    },
    {
      icon: "fa-brands fa-instagram",
      link: "https://instagram.com/thennofficial?igshid=MzRlODBiNWFlZA==",
    },
    {
      icon: "fa-brands fa-tiktok",
      link: "https://www.tiktok.com/@thenewnormalofficial",
    },
    {
      image: tradingLogo,
      link: "https://www.tradingview.com/u/THENEWNORMAL/",
    },
  ];
  /* 
      <div className="bg-subMain pt-16 pb-10  text-mainBorders">
      <div className="container border-b border-mainBorders py-4">
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 text-center sm:text-start">
          <div>
            <h2 className="text-mainText mb-10 text-2xl font-semibold">
              <Link to="/">
                <img src={logo} className="w-24 " alt="" />
              </Link>
            </h2>
          </div>

          <div>
            <h4 className="text-mainText text-xl mb-4">Info</h4>
            <ul className="space-y-2">
              <li>020 4599 7065</li>
              <li>info@vanquishcptl.com</li>
              <li>Tyttenhanger House, AL4 0PG,</li>
              <li>St. Albans, United Kingdom</li>
              <li className="text-mainText flex gap-4 justify-center  sm:justify-start ">
                {media.map((item, i) => (
                  <a href={item.link} target="_blank" rel="noreferrer" key={i}>
                    <i className={`${item.icon}`}></i>
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="mt-6 text-sm text-center">
        © Copyright 2023 Vanquish Capital. All Rights Reserved.
      </p>
    </div>
    */
  return (
    <div className="bg-subMain pt-16 pb-10  text-mainBorders">
      <div className="container border-b border-mainBorders py-4">
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-center sm:text-start">
          <div>
            <h2 className="text-mainText mb-10 text-2xl font-semibold">
              <Link to="/">
                <img src={logo} className="w-24 " alt="" />
              </Link>
            </h2>
          </div>

          <div className="text-center">
            <h4 className="text-mainText text-xl mb-4">الشركة </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about-us">تعرف علينا</Link>
              </li>
            </ul>
          </div>
          <div className="text-center">
            <h4 className="text-mainText text-xl mb-4">القوانين</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/legal-and-privecy">القوانين والخصوصية</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-mainText text-xl mb-4">تواصل معنا</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:info@thenewnormal.trade"
                  target="_blank"
                  rel="noreferrer"
                >
                  info@thenewnormal.trade
                </a>
              </li>
              <li className="text-mainText flex gap-4 justify-center  sm:justify-start ">
                {media.map((item, i) => (
                  <a href={item.link} target="_blank" rel="noreferrer" key={i}>
                    {item.icon ? (
                      <>
                        <i className={`${item.icon}`}></i>
                      </>
                    ) : (
                      <>
                        <img
                          src={item.image}
                          className="w-6 rounded-xl"
                          alt=""
                        />
                      </>
                    )}
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="mt-6 text-sm text-center">
        جميع الحقوق محفوظة © 2024 The New Normal.
      </p>
    </div>
  );
};

export default Footer;
