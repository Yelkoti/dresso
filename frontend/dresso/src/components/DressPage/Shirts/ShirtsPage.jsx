import React, { useEffect } from "react";
import ShirtCard from "./ShirtCard";
import { useGetShirtsQuery } from "../../../store/api/shirtApiSlice";
import {
  dressSkeletonLoadingForDeskop,
  dressSkeletonLoadingForMobile,
} from "../../MultiComponents/skeletonLoading";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";

const ShirtsPage = () => {
  const isTab = useMediaQuery({
    query: "(min-width: 640px)",
  });

  const {
    data: shirts,
    isLoading: loadingShirts,
    error: errorWhileLoadingShirts,
  } = useGetShirtsQuery();


  const errorHandling = () => {
    toast.error("Error while loading the shirts data");
    return (
      <h3 className="font-bold text-gray-600 text-xl mt-2">No data</h3>
    );
  }

  return (
    <div className="w-[80%] m-auto space-y-5">
      {/* should wash */}
      <div className="border border-gray-300 p-4 relative hover:shadow-md">
        <h3 className="font-bold text-2xl text-gray-600 absolute top-0 left-0 bg-white rounded-md px-2 -mt-2 z-10">
          Need to wash
        </h3>
        <div className="flex flex-wrap justify-center">
          {loadingShirts
            ? isTab
              ? dressSkeletonLoadingForDeskop()
              : dressSkeletonLoadingForMobile()
            : errorWhileLoadingShirts
            ? errorHandling()
            : shirts.map((shirt, index) => (
                <div key={index} className="w-full sm:w-2/3 xl:w-1/2 p-4">
                  <ShirtCard shirt={shirt} />
                </div>
              ))}
        </div>
      </div>
      {/* currently used */}
      <div className="border border-gray-300 p-4 relative hover:shadow-md">
        <h3 className="font-bold text-2xl text-gray-600 absolute top-0 left-0 bg-white rounded-md px-2 -mt-2 z-10">
          Currently in Use
        </h3>
        <div className="flex flex-wrap justify-center">
          {loadingShirts
            ? isTab
              ? dressSkeletonLoadingForDeskop()
              : dressSkeletonLoadingForMobile()
            : errorWhileLoadingShirts
            ? <h3 className="font-bold text-gray-600 text-xl mt-2">No data</h3>
            : shirts.map((shirt, index) => (
                <div key={index} className="w-full sm:w-2/3 xl:w-1/2 p-4">
                  <ShirtCard shirt={shirt} />
                </div>
              ))}
        </div>
      </div>
      {/* washed */}
      <div className="border border-gray-300 p-4 relative hover:shadow-md">
        <h3 className="font-bold text-2xl text-gray-600 absolute top-0 left-0 bg-white rounded-md px-2 -mt-2 z-10">
          Washed
        </h3>
        <div className="flex flex-wrap justify-center">
          {loadingShirts
            ? isTab
              ? dressSkeletonLoadingForDeskop()
              : dressSkeletonLoadingForMobile()
            : errorWhileLoadingShirts
            ? <h3 className="font-bold text-gray-600 text-xl mt-2">No data</h3>
            : shirts.map((shirt, index) => (
                <div key={index} className="w-full sm:w-2/3 xl:w-1/2 p-4">
                  <ShirtCard shirt={shirt} />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default ShirtsPage;
