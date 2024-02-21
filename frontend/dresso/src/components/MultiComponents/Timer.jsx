import React, { useState, useEffect } from "react";

const Stopwatch = ({ usedTimeInMilliseconds, type }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  const textClass = type === "wash" ? "text-red-600 text-lg" : "text-green-600";

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Date.now() - usedTimeInMilliseconds);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [usedTimeInMilliseconds]);

  const formatTime = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    return `${days}:${hours}:${minutes} ${type === "wash" ? "Limit Exceeded." : ""}`;
  };

  return (
    <div>
      <p className={`font-bold ${textClass}`}>{formatTime(elapsedTime)}</p>
    </div>
  );
};

export default Stopwatch;
