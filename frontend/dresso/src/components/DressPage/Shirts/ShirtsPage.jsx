import React from "react";
import ShirtCard from "./ShirtCard";
import { useGetShirtsQuery } from "../../../store/api/shirtApiSlice";
import {
  dressSkeletonLoadingForDeskop,
  dressSkeletonLoadingForMobile,
} from "../../MultiComponents/skeletonLoading";
import { useMediaQuery } from "react-responsive";
// import { toast } from "react-toastify";

const ShirtsPage = () => {
  const isTab = useMediaQuery({
    query: "(min-width: 640px)",
  });

  const {
    data: shirts,
    isLoading: loadingShirts,
    error: errorWhileLoadingShirts,
  } = useGetShirtsQuery();

  const availableShirts =
    !loadingShirts &&
    !errorWhileLoadingShirts &&
    shirts &&
    shirts.filter((shirt) => shirt.isWashed);

  const currentlyUsedShirts =
    !loadingShirts &&
    !errorWhileLoadingShirts &&
    shirts &&
    shirts.filter((shirt) => {
      if (shirt.isWashed) return false;
      const limit = shirt.limit;
      const usedDate = new Date(shirt.usedOn);
      const curDate = new Date(Date.now());
      const daysDifference = Math.floor(
        Math.abs(curDate - usedDate) / (1000 * 60 * 60 * 24)
      );
      return daysDifference < limit;
    });

  const NeedToWashtShirts =
    !loadingShirts &&
    !errorWhileLoadingShirts &&
    shirts &&
    shirts.filter((shirt) => {
      if (!shirt.use) return false;
      const limit = shirt.limit;
      const usedDate = new Date(shirt.usedOn);
      const curDate = new Date(Date.now());
      const daysDifference = Math.floor(
        Math.abs(curDate - usedDate) / (1000 * 60 * 60 * 24)
      );
      return daysDifference >= limit;
    });

  // const errorHandling = () => {
  //   toast.error("Error while loading the shirts data");
  //   return <h3 className="font-bold text-gray-600 text-xl mt-2">No data</h3>;
  // };

  return (
    <div className="w-[80%] m-auto space-y-5">
      {/* should wash */}
      <div className="border border-gray-300 p-4 relative hover:shadow-md">
        <h3 className="font-bold text-2xl text-gray-600 absolute top-0 left-0 bg-white rounded-md px-2 -mt-2 z-10">
          Need to wash
        </h3>
        <div className="flex flex-wrap justify-center">
          {loadingShirts ? (
            isTab ? (
              dressSkeletonLoadingForDeskop()
            ) : (
              dressSkeletonLoadingForMobile()
            )
          ) : errorWhileLoadingShirts || NeedToWashtShirts.length === 0 ? (
            <h3 className="font-bold text-gray-600 text-xl mt-2">No data</h3>
          ) : (
            NeedToWashtShirts.map((shirt, index) => (
              <div key={index} className="w-full sm:w-2/3 xl:w-1/2 p-4">
                <ShirtCard shirt={shirt} type={"wash"} />
              </div>
            ))
          )}
        </div>
      </div>
      {/* currently used */}
      <div className="border border-gray-300 p-4 relative hover:shadow-md">
        <h3 className="font-bold text-2xl text-gray-600 absolute top-0 left-0 bg-white rounded-md px-2 -mt-2 z-10">
          Currently in Use
        </h3>
        <div className="flex flex-wrap justify-center">
          {loadingShirts ? (
            isTab ? (
              dressSkeletonLoadingForDeskop()
            ) : (
              dressSkeletonLoadingForMobile()
            )
          ) : errorWhileLoadingShirts || currentlyUsedShirts.length === 0 ? (
            <h3 className="font-bold text-gray-600 text-xl mt-2">No data</h3>
          ) : (
            currentlyUsedShirts.map((shirt, index) => (
              <div key={index} className="w-full sm:w-2/3 xl:w-1/2 p-4">
                <ShirtCard shirt={shirt} type={"use"} />
              </div>
            ))
          )}
        </div>
      </div>
      {/* washed */}
      <div className="border border-gray-300 p-4 relative hover:shadow-md">
        <h3 className="font-bold text-2xl text-gray-600 absolute top-0 left-0 bg-white rounded-md px-2 -mt-2 z-10">
          Washed
        </h3>
        <div className="flex flex-wrap justify-center">
          {loadingShirts ? (
            isTab ? (
              dressSkeletonLoadingForDeskop()
            ) : (
              dressSkeletonLoadingForMobile()
            )
          ) : errorWhileLoadingShirts || availableShirts.length === 0 ? (
            <h3 className="font-bold text-gray-600 text-xl mt-2">No data</h3>
          ) : (
            availableShirts.map((shirt, index) => (
              <div key={index} className="w-full sm:w-2/3 xl:w-1/2 p-4">
                <ShirtCard shirt={shirt} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ShirtsPage;
