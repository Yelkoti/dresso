import React, { useEffect, useState } from "react";

const Carousel = ({ slides }) => {
  const [curr, setCurr] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (curr === slides.length - 1) setCurr(0);
      else setCurr(curr + 1);
    }, 2000);
    return () => clearInterval(intervalId);
  }, [curr, slides.length]);

  return (
    <div className="overflow-hidden sm:w-[100%] lg:w-[40%]">
      <div
        className="flex transition ease-out duration-40"
        style={{
          transform: `translateX(-${curr * 100}%)`,
        }}
      >
        {slides.map((s) => {
          return <img src={s} className="rounded-md" />;
        })}
      </div>
    </div>
  );
};

export default Carousel;
