import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosRemove, IoMdAdd } from "react-icons/io";
import placeHolder from "../../assets/userPlaceHolder.jpg";
import { route } from "../../App";
import { FaEye } from "react-icons/fa";

const TreeMember = ({ data, level }) => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [children, setChildren] = useState([]);
  const token = localStorage.getItem("token");

  const getData = function (id) {
    console.log(id);
    setIsLoading(true);
    fetch(`${route}marketing/getUserChildren/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.data) setChildren(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };
  console.log(data);
  return (
    // <li>
    //   <div>
    //     <img
    //       src={data?.profileImg ? data?.profileImg : placeHolder}
    //       onError={(e) => {
    //         e.target.src = placeHolder;
    //       }}
    //     />
    //     <span>{data?.name}</span>
    //     {data?.mediator?.email && (
    //       <span>
    //         <b className="text-mainText">الوسيط :</b> {data?.mediator?.email}
    //       </span>
    //     )}
    //   </div>
    // </li>
    <li>
      <div>
        <img
          src={data?.profileImg ? data?.profileImg : placeHolder}
          onError={(e) => {
            e.target.src = placeHolder;
          }}
        />
        <span>{data?.name}</span>
        {level <= 4 && (
          <button
            onClick={() => {
              if (!show) getData(data._id);
              setShow((prev) => !prev);
            }}
            className="absolute bottom-0 right-0 flex items-center justify-center w-8 h-8 text-xl text-white rounded-full bg-gold"
          >
            {show ? <IoIosRemove /> : <IoMdAdd />}
          </button>
        )}
        <p className="absolute flex items-center justify-center w-8 h-8 text-lg font-semibold text-white rounded-full bg-gold top-2 left-2">
          {level}st
        </p>
        {data?.startMarketing && (
          <Link
            to={`/marketing/log/${data?._id}`}
            className="absolute bottom-0 left-0 flex items-center justify-center w-8 h-8 text-xl rounded-full bg-gold text-dark"
          >
            <FaEye />
          </Link>
        )}
      </div>
      {show && (
        <ul>
          {isLoading && "...يتم التحميل"}
          {!isLoading && (
            <>
              {children.length === 0
                ? "لا يوجد المزيد"
                : children.map((child) => (
                    <TreeMember
                      level={level + 1}
                      data={child}
                      key={child._id}
                    />
                  ))}
            </>
          )}
        </ul>
      )}
    </li>
  );
};

export default TreeMember;
