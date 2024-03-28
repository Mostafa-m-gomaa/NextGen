import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import { route } from "../../App";

import AnotherCard from "../../components/anotherCard";
const Courses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch(`${route}education/packages`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCourses(data.data);
      });
  }, []);
  function convertTime(durationInDays) {
    if (durationInDays > 1000) {
      return "مدي الحياة";
    }
    if (durationInDays >= 365) {
      const years = Math.floor(durationInDays / 365);
      return `${years} سنة`;
    } else if (durationInDays >= 30) {
      const months = Math.floor(durationInDays / 30);
      return `${months} شهر`;
    } else if (durationInDays >= 7) {
      const weeks = Math.floor(durationInDays / 7);
      return `${weeks} أسبوع`;
    } else {
      return `${durationInDays} يوم`;
    }
  }
  console.log(courses);
  return (
    <section className="pt-16" id="coursesSection">
      <div className="container ">
        <h2 className="flex-1 mx-auto mb-10 text-3xl leading-tight text-center md:text-4xl lg:text-5xl">
          الباقات{" "}
        </h2>
        <br />
        <br />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses?.map((item, ind) =>
            item.type === "package" ? (
              <AnotherCard key={item._id} ind={ind} data={item} />
            ) : null
          )}
        </div>
        {/* <div className="max-w-[95vw] mx-auto overflow-x-auto overflow-y-visible my-16">
          <table className="w-full ">
            <thead className="whitespace-nowrap">
              <tr>
                <th className="p-6 "></th>
                {courses.map((course) => (
                  <th className="p-6" key={course._id}>
                    {course.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="border-4 border-mainBorders bg-betMain">
              <tr>
                <td className="p-6 border border-mainBorders ">سعر الكورس</td>

                {courses.map((course) => (
                  <td
                    key={course._id}
                    className="p-6 border border-mainBorders "
                  >
                    {course.price}$
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-6 border border-mainBorders ">
                  مده صلاحية الكورس
                </td>

                {courses.map((course) => (
                  <td
                    key={course._id}
                    className="p-6 border border-mainBorders "
                  >
                    {convertTime(course.expirationTime)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-6 border border-mainBorders ">
                  سعر إعاده التجديد
                </td>

                {courses.map((course) => (
                  <td
                    key={course._id}
                    className="p-6 border border-mainBorders "
                  >
                    {course.renewPrice}$
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-6 border border-mainBorders ">وصف الكورس</td>

                {courses.map((course) => (
                  <td
                    key={course._id}
                    className="p-6 border border-mainBorders "
                  >
                    {course.description}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-6 border border-mainBorders ">
                  قنوات التيليجرام
                </td>

                {courses.map((course) => (
                  <td
                    key={course._id}
                    className="p-6 border border-mainBorders "
                  >
                    {course?.telegramChannelNames?.join(" - ")}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-6 border border-mainBorders ">شراء الكورس</td>

                {courses.map((course) => (
                  <td
                    key={course._id}
                    className="p-6 border border-mainBorders "
                  >
                    <Link
                      to="/login"
                      className="px-4 py-1 text-lg rounded-full whitespace-nowrap text-main bg-mainText "
                    >
                      اشتري الان
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div> */}
      </div>
      {/* <div className="container relative">
        <div className="absolute flex items-center justify-center w-full h-full">
          <div className="flex flex-col justify-center gap-6 text-center md:gap-8 lg:gap-12">
            <Link
              href="/"
              className="text-3xl font-semibold md:text-5xl sm:text-4xl lg:text-6xl"
            >
              <img src={logo} alt="" className="w-32 mx-auto" />
            </Link>
            <h2 className="text-xl font-semibold md:text-3xl sm:text-2xl lg:text-4xl">
              GET USED TO THE FUTURE
            </h2>
            <Link
              to={"/login"}
              className="items-center hidden gap-2 px-6 py-3 mx-auto text-sm font-medium rounded-full group lg:flex w-fit bg-mainText text-main"
            >
              <i className="text-xs transition-all duration-300 group-hover:translate-x-1 fa-solid fa-angle-right"></i>
              <span>ابدأ الان</span>
            </Link>
          </div>
        </div>
        <img
          src="https://framerusercontent.com/images/AkPhOA2lSM257qMb7nZ10lgkk.jpg?scale-down-to=2048"
          className="rounded-lg "
          alt=""
        />
      </div> */}
    </section>
  );
};

export default Courses;
