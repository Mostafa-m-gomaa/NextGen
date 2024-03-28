import { useContext, useEffect, useRef, useState } from "react";
import DashboardSlide from "../components/DashboardSlide";
import PostCard from "../components/PostCard";
import { AppContext, route } from "../App";
import { useNavigate } from "react-router-dom";
import EconomicCalendar from "../components/EconomicCalendar";
import Footer from "../components/Footer";
import DashHeader from "../components/DashHeader";

const Analytic = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesNumber, setPagesNumber] = useState(0);
  const container = useRef();
  const { setLoading } = useContext(AppContext);
  const contianer = useRef();
  const ecoRef = useRef();
  const nav = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);

    fetch(
      `${route}analytic/posts?sort=-createdAt&sharedTo=analytic&page=${currentPage}
      }`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          setPosts(data.data);
        } else {
          setPosts([]);
        }

        setPagesNumber(data.paginationResult.numberOfPages);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "autosize": true,
          "symbol": "FX:EURUSD",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "enable_publishing": true,
          "withdateranges": true,
          "range": "YTD",
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "details": true,
          "hotlist": true,
          "calendar": true,
          "show_popup_button": true,
          "popup_width": "1000",
          "popup_height": "650",
          "support_host": "https://www.tradingview.com"
        }`;
    container.current.appendChild(script);
  }, []);
  useEffect(() => {
    if (ecoRef.current) {
      ecoRef.current.scrollTo({
        left: 0,
      });
    }
  }, [ecoRef]);
  return (
    <>
      <DashHeader />
      <div className="home-for-login">
        <div className="mb-10 iframeCon">
          <div className="tradingview-widget-container" ref={container}>
            <div className="tradingview-widget-container__widget"></div>
            <div className="tradingview-widget-copyright">
              <a
                href="https://www.tradingview.com/"
                rel="noreferrer"
                target="_blank"
              >
                <span className="blue-text">
                  Track all markets on TradingView
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="container flex flex-col-reverse mx-auto lg:flex-row">
          <div className="w-[100%] p-4">
            <div>
              {posts?.map((post) => {
                return <PostCard post={post} key={post._id} date={true} />;
              })}
            </div>
            {pagesNumber > 1 && (
              <div className="p-4 bg-blackGold rounded-xl">
                <h2 className="text-xl text-center">
                  هناك {pagesNumber} صفحات
                </h2>
                <div className="flex items-center justify-center mx-auto border w-fit border-lightGray rounded-xl">
                  <button
                    className={`rounded-r-xl p-3 text-center disabled:cursor-not-allowed w-[90px] bg-gold text-dark disabled:bg-gray`}
                    disabled={currentPage === 1}
                    onClick={() => {
                      setCurrentPage((prev) => prev - 1);
                      contianer.current.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    السابق
                  </button>

                  <div className=" p-3 text-center w-[90px]">{currentPage}</div>

                  <button
                    className={`rounded-l-xl p-3 text-center disabled:cursor-not-allowed w-[90px] bg-gold text-dark disabled:bg-gray`}
                    disabled={pagesNumber <= currentPage}
                    onClick={() => {
                      setCurrentPage((prev) => prev + 1);
                      contianer.current.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    التالي
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="w-full lg:w-[450px] xl:w-[650px]   px-2 md:px-4 rounded-xls mt-8">
            <div className="p-6 mb-4 bg-blackGold rounded-2xl">
              <div className=" max-w-[100%] overflow-auto">
                <EconomicCalendar />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Analytic;
