import { useContext, useEffect, useRef } from "react";
import logo from "../../assets/fe.png";
import logo2 from "../../assets/logo2.jpg";
import { useTransform, useScroll, motion } from "framer-motion";
import { AppContext } from "../../App";
import './landing.css'
import im from '../../assets/nnn.jpg'


const LandingSection = () => {
  const container = useRef(null);
  const { theme } = useContext(AppContext);

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ["start end", "end start"],
  });
  const imageTranslateY = useTransform(
    scrollYProgress,
    [0.5, 0.6],
    ["0px", "150px"]
  );

  const imageScale = useTransform(scrollYProgress, [0.5, 1], [1, 0.2]);

  return (
    <section
      className={theme === "light" ? "py-12 bg-main" : "py-12 sectionBg "}
      id="mainSection"
    >
      <div ref={container} className="container   mx-auto">
        <div>
        {/* style={{
              translateY: imageTranslateY,
              scale: imageScale,
            }} */}
          <motion.div
            className="relative z-[1] logo-container"
        
          >
            {theme === "light" ? (
              <img
                src={logo2}
                className="logo-light"
                alt=""
              />
            ) : (
              <img
                src={logo}
                className="logo"
                alt=""
              />
            )}
            <h1 className="text-4xl text-mainText font-semibold text-center mb-4 -translate-y-6 sayed">
              GET USESD TO THE FUTURE
            </h1>
          </motion.div>

          <div className="relative">
            <div
              className="absolute opacity-60 w-[100%] h-[100%] top-[50%]  right-[50%] translate-x-[50%] -translate-y-[50%]"
           
            />
            <motion.img
              className="mx-auto transition-all relative z-[2] laptop-image"
              src={im}
              // src={im}
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingSection;
