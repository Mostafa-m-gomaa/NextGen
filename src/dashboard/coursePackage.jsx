import { useEffect, useState } from "react";
import { route } from "../App";
import axios from "axios";
import DashboardSlide from "../components/DashboardSlide";
import LoadingSpinner from "../landingPage/components/LoadingSpinner";
import PackageCard from "../components/PackageCard";
import CoursePackCard from "../components/CoursePackCard";

const CoursePack = () => {
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    axios
      .get(`${route}education/packages?sort=-price`)
      .then((res) =>{
        console.log(res.data.data)
        setPackages(res.data.data)});
  }, []);

  return (
    <div>
      {/* <DashboardSlide /> */}
      <h3 className="text-2xl font-semibold flex justify-between object-contain pt-6">
           الدورات
          </h3>
      {packages.length === 0 && <LoadingSpinner />}
      <div className="grid  justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
        <>
          {packages?.map((item, ind) => (
            // item.type === "course" ?<PackageCard key={item._id} ind={ind} data={item} /> :null
            item.type === "course" ?<CoursePackCard key={item._id} ind={ind} data={item} /> :null
            
          ))}
        </>
      </div>
    </div>
  );
};

export default CoursePack;
