import { useContext, useEffect, useState } from "react";
import DashboardSlide from "../../components/DashboardSlide";
import { AppContext, route } from "../../App";
import axios from "axios";
import BrokderVideoCard from "./BrokderVideoCard";

const Broker = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const { setLoading } = useContext(AppContext);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${route}broker/suitable`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
   
        if (res.data.data){

          setData(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      <DashboardSlide />
      {data.map((item) => (
        <div key={item._id} className="my-6 p-2 border border-gray rounded-2xl">
          <h2 className="text-center p-2 sm:text-lg md:text-xl lg:text-2xl">
            Videos
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {item.videoLinks.map((link, ind) => (
              <BrokderVideoCard key={link} ind={ind} link={link} />
            ))}
          </div>
          <h2 className="text-center p-2 sm:text-lg md:text-xl lg:text-2xl">
            {item.title}
          </h2>
          <a
            className="block w-fit mx-auto px-6 py-3 bg-mainText text-main rounded-full"
            href={item.link}
            target="_blank"
            rel="noreferrer"
          >
            Link
          </a>
        </div>
      ))}
      {data.length === 0 && (
        <div className="text-mainText text-4xl my-20 text-center w-full">
          <div>

          يرجى التواصل معنا لتوصيلك بالبروكر المناسب لك 
حساب التلجرام
          </div>
<a href="https://t.me/TNNSUPPORT" style={{color : "blue"}}>من هنا</a>
        </div>
      )}
       
    </>
  );
};

export default Broker;
