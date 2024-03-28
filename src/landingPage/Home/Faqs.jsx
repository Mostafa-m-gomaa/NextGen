import { Link } from "react-router-dom";
import FaqCard from "./FaqCard";
import { useEffect, useState } from "react";
import { route } from "../../App";

const Faqs = () => {
  const [faqs, setFaqs] = useState([]);
  useEffect(() => {
    fetch(`${route}question`)
      .then((res) => res.json())
      .then((data) => {
        setFaqs(data.data);
       
      });
  }, []);
  return (
    <div className="container pb-16">
      <div className=" my-12 py-6 border-b border-mainBorders flex justify-between items-center">
        <h2 className=" md:text-4xl text-3xl lg:text-5xl">الأسئلة الشائعة</h2>
        <Link
          to={"/login"}
          className="py-3 group hidden lg:flex items-center gap-2 rounded-full bg-mainText text-main text-sm font-medium px-6"
        >
          <i className="text-xs transition-all group-hover:translate-x-1 duration-300 fa-solid fa-angle-right"></i>
          <span>ابدأ الان</span>
        </Link>
      </div>
      <ul>
        {faqs.map((faq) => (
          <FaqCard key={faq._id} title={faq.question} answer={faq.answer} />
        ))}
      </ul>
    </div>
  );
};

export default Faqs;
