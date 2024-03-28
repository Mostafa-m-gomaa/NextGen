import { useState } from "react";

const BrokderVideoCard = ({ link, ind }) => {
  const [open, setOpen] = useState(false);

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
              src={link}
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
        className="col-span-1 aspect-square p-4 cursor-pointer  font-semibold border border-gray rounded-2xl"
      >
        <iframe
          src={link}
          loading="lazy"
          className="w-full h-full"
          allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
          allowfullscreen="true"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        {/* <button className="text-center mt-4 mx-auto block w-fit">
          Open full screen
        </button> */}
      </div>
    </>
  );
};

export default BrokderVideoCard;
