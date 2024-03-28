import { useContext, useEffect, useState } from "react";

import { AppContext, route } from "../../App";
import DashboardSlide from "../../components/DashboardSlide";
import { Link, useParams } from "react-router-dom";
import gr from '../../assets/gr.png'

const Courses = () => {
  const { setLoading } = useContext(AppContext);
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("token");
  const catId = useParams().catId;

  useEffect(() => {
    setLoading(true);

    fetch(
      `${route}education/courses/relatedCourses/${catId}?sort=orderNumber`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.data);
        console.log(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* <DashboardSlide /> */}
      {!courses?.length && (
        <div className="text-lightGray text-4xl my-20 text-center w-full">
          Can not find any courses in this category
        </div>
      )}
      <div className="border border-gray rounded-2xl bg-main p-2 md:p-6  m-2  md:m-6 gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid">
        {courses?.map((course ,index) => {
          return (
            <Link
              to={course.showBroker ? `course/${"bro"}/${course._id}`: `course/${"noBro"}/${course._id}` }
              className="col-span-1 p-2 border border-gray rounded-2xl"
              key={course._id}
            >
              {course.image ? <img src={course.image} alt="" /> :<img src={gr} alt="" /> }
              
              <div className="category" key={course._id}>
                <h2 className="text-center p-2 sm:text-lg md:text-xl lg:text-2xl">
                  {course.title}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
