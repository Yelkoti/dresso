import Carousel from "../MultiComponents/Carousel";
import React from "react";
import { useMediaQuery } from "react-responsive";

const shirts = [
  "https://imgs.search.brave.com/7SmkJiNyGSQq5NMAAD6U6Bl1K-llBRyBqvzRnO5nKQs/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE2/MjI0NDUyNzU0NjMt/YWZhMmFiNzM4YzM0/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TWpCOGZI/Tm9hWEowZkdWdWZE/QjhmREI4Zkh3dw",
  "https://imgs.search.brave.com/xR5QF2I_2MEGFVrE_wQclpRsGWCNzcxiS8Rl3ONRxy0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/ODY3OTAxNzAwODMt/MmY5Y2VhZGM3MzJk/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4Tm54OGRD/VXlNSE5vYVhKMGZH/VnVmREI4ZkRCOGZI/d3c",
  "https://imgs.search.brave.com/Ghim0FmzNoQcdru9qOkn88KqnABHBhSVHN0y7qyOW4w/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/NzE5NDUxNTMyMzct/NDkyOWU3ODNhZjRh/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TVRWOGZI/UWxNakJ6YUdseWRI/eGxibnd3Zkh3d2ZI/eDhNQT09",
];

const pants = [
  "https://imgs.search.brave.com/aUtIMGyTntrQIXSOd6CVn38ni1ZSVHgP96x-V1OST0Q/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE2/MDIyOTM1ODk5MzAt/NDVhYWQ1OWJhM2Fi/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4Tm54OGNH/RnVkSHhsYm53d2ZI/d3dmSHg4TUE9PQ",
  "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const Home = () => {
  const isTab = useMediaQuery({
    query: "(min-width: 640px)",
  });

  return (
    <div className="sm:w-[80%] sm:m-auto">
      <div className="flex p-4 flex-col sm:m-auto sm:flex-row">
        <Carousel slides={shirts} />
        <div className="p-2 font-semibold text-gray-800">
          <p>
            An anime television series adaptation, produced by Toei Animation,
            premiered on Fuji TV on October 20, 1999; the series reached its
            1,000th episode in November 2021.
          </p>
        </div>
      </div>
      <div className="flex p-4 flex-col sm:m-auto sm:flex-row">
        <div className="p-2 font-semibold text-gray-800">
          {!isTab && <Carousel slides={pants} />}
          <p>
            An anime television series adaptation, produced by Toei Animation,
            premiered on Fuji TV on October 20, 1999; the series reached its
            1,000th episode in November 2021.
          </p>
        </div>
        {isTab && <Carousel slides={pants} />}
      </div>
    </div>
  );
};

export default Home;
