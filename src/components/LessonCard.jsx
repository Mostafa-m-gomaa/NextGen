import { useState } from "react";
import { Link } from "react-router-dom";

const LessonCard = ({ lesson, showBroker }) => {
  const [open, setOpen] = useState(false);
  console.log(lesson);
  //   videoUrl
  return (
    <>
      {open && (
        <div className="fixed w-full h-full top-0 right-0 bg-[#000] bg-opacity-75 flex items-center justify-center">
          <div className="relative p-2 w-1/2 aspect-video bg-blackGold">
            <div
              className="absolute -top-6 -right-6 w-6 h-6 bg-[#fff] text-dark rounded-full flex items-center justify-center text-xl cursor-pointer"
              onClick={() => setOpen(false)}
            >
              x
            </div>
            <iframe
              src={lesson?.videoUrl}
              loading="lazy"
              className="w-full h-full"
              allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
              allowfullscreen="true"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      )}
      <div
        onClick={() => setOpen(true)}
        className="col-span-1 p-2 border border-gray rounded-2xl"
      >
        <div key={lesson._id}>
          {lesson.image ? (
            <img
              src={lesson.image}
              onError={(e) => (e.target.src = image)}
              className="aspect-square  rounded-2xl"
            />
          ) : (
            <img src={image} className="aspect-square  rounded-2xl" />
          )}
          <h2 className="text-center p-2 sm:text-lg md:text-xl lg:text-2xl">
            {lesson.title}
          </h2>
        </div>
      </div>
      {showBroker && (
        <div className="col-span-1 p-2 border flex items-center justify-center border-gray rounded-2xl">
          <Link
            to="/broker"
            className="text-main bg-mainText px-6 py-3 rounded-xl text-lg"
          >
            {" "}
            Broker
          </Link>
        </div>
      )}
    </>
  );
};

export default LessonCard;
