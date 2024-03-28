import './dash.css'
import one from "../assets/nnn.jpg";
const DashboardSlide = () => {
  return (
    <div className="img-cont">
      <img src={one} className=" md:m-0 aspect-[3/1] sos" alt="" />
      {/* <h2 className='at-image-cont'>ابدأ رحلتك التعليمية</h2>
      <h4 className='in-image-cont'>خبرات مختلفة أمتدت إلى 20 دولة حول العالم بهدف التعليم الذاتي في مجال التداول ونشر ثقافة الوعي المالي.

</h4> */}
      {/* <button>ابدأ معنا</button> */}
    </div>
  );
};

export default DashboardSlide;

// max-w-[100vw]  md:m-6 rounded-lg