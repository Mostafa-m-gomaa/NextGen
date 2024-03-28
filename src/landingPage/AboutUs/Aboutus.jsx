import logo from "../../assets/logo.png";
const AboutUs = () => {
  return (
    <section id="aboutUsSection" className="py-16 space-y-16 container mx-auto">
      <div className="flex flex-col gap-6 items-center justify-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold">
          تعرف علينا
        </h1>
        <img src={logo} className="w-32" alt="" />
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
          THE NEW NORMAL
        </h2>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
          الإعتياد الجديد
        </h2>
        <p className=" lg:text-lg text-center">
          نهتم بنشر الوعي المالي و تصحيح فكرة الإستثمار بتوجيه عدد من ذوي الخبرة
          كما تهدف إلى تمكين اكبر عدد من الأفراد في الأسواق المالية ليصبح كل فرد
          مستثمر بذاته و نساعدك لفهم العالم المالي الحديث و تطور مصادر الدخل
          المتعددة
        </p>
      </div>
      <div>
        <h2 className="text-xl text-center sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
          هدفنا هو
        </h2>
        <div className="p-8  border border-mainBorders my-10 rounded-xl gap-8 gap-y-8 grid sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col items-center justify-center gap-8">
            <i className="fa-solid fa-school  text-2xl"></i>
            <h4 className="text-lg font-semibold">
              تطوير الأفراد في التعليم المالي في أسواق المال
            </h4>
          </div>
          <div className="flex flex-col items-center justify-center gap-8">
            <i className="fa-solid fa-money-bill-transfer  text-2xl"></i>
            <h4 className="text-lg font-semibold">
              توفير أدوات استثمارية والمساعدة في التدريب عليها
            </h4>
          </div>
          <div className="flex flex-col items-center justify-center gap-8">
            <i className="fa-solid fa-money-bill-trend-up text-2xl"></i>
            <h4 className="text-lg font-semibold">
              أن نصبح واجهة العالم الحديث في تعلم الاسواق المالية
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
