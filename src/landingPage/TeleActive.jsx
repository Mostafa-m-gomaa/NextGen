import logo from "../assets/fe.png";
import { Link } from "react-router-dom";
const TeleActive = () => {
  const myId = JSON.parse(localStorage.getItem("data"))?._id;

  return (
    <div className="w-full min-h-screen login relative flex items-center justify-center">
      <a
        href={`https://t.me/The_New_Normal_bot?start=${myId}`}
        target="_blank"
        rel="noreferrer"
        className="relative z-10 bg-mainText py-4 rounded-full text-main font-semibold text-lg px-6 w-fit block mx-auto"
      >
        اضغط هنا لتقوم بربط حساب التيليجرام
      </a>
      <Link to={"/"} className="absolute block top-0 left-0 w-32 z-10">
        <img src={logo} className="w-fit" />
      </Link>
      <div className="w-full h-full top-0 right-0 absolute bg-[black] bg-opacity-80" />
    </div>
  );
};

export default TeleActive;
