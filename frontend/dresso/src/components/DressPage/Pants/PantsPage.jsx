import React from "react";
import PantCard from "./PantsCard";
import { useGetPantsQuery } from "../../../store/api/pantApiSlice";
import {
  dressSkeletonLoadingForDeskop,
  dressSkeletonLoadingForMobile,
} from "../../MultiComponents/skeletonLoading";
import { useMediaQuery } from "react-responsive";
// import { toast } from "react-toastify";

const PantsPage = () => {
  const isTab = useMediaQuery({
    query: "(min-width: 640px)",
  });

  const {
    data: pants,
    isLoading: loadingPants,
    error: errorWhileLoadingPants,
  } = useGetPantsQuery();

  const availablePants =
    !loadingPants &&
    !errorWhileLoadingPants &&
    pants &&
    pants.filter((pant) => pant.isWashed);

  const currentlyUsedPants =
    !loadingPants &&
    !errorWhileLoadingPants &&
    pants &&
    pants.filter((pant) => {
      if (pant.isWashed) return false;
      const limit = pant.limit;
      const usedDate = new Date(pant.usedOn);
      const curDate = new Date(Date.now());
      const daysDifference = Math.floor(
        Math.abs(curDate - usedDate) / (1000 * 60 * 60 * 24)
      );
      return daysDifference < limit;
    });

  const NeedToWashtPants =
    !loadingPants &&
    !errorWhileLoadingPants &&
    pants &&
    pants.filter((pant) => {
      if (pant.isWashed) return false;
      const limit = pant.limit;
      const usedDate = new Date(pant.usedOn);
      const curDate = new Date(Date.now());
      const daysDifference = Math.floor(
        Math.abs(curDate - usedDate) / (1000 * 60 * 60 * 24)
      );
      return daysDifference >= limit;
    });

    console.log("pants => ", pants);
    console.log("available => ",availablePants);
    console.log("currently use => ", currentlyUsedPants);
    console.log("need to wash => ", NeedToWashtPants);

  // const errorHandling = () => {
  //   toast.error("Error while loading the pants data");
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
          {loadingPants ? (
            isTab ? (
              dressSkeletonLoadingForDeskop()
            ) : (
              dressSkeletonLoadingForMobile()
            )
          ) : errorWhileLoadingPants || NeedToWashtPants.length === 0 ? (
            <h3 className="font-bold text-gray-600 text-xl mt-2">No data</h3>
          ) : (
            NeedToWashtPants.map((pant, index) => (
              <div key={index} className="w-full sm:w-2/3 xl:w-1/2 p-4">
                <PantCard pant={pant} type={"wash"} />
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
          {loadingPants ? (
            isTab ? (
              dressSkeletonLoadingForDeskop()
            ) : (
              dressSkeletonLoadingForMobile()
            )
          ) : errorWhileLoadingPants || currentlyUsedPants.length === 0 ? (
            <h3 className="font-bold text-gray-600 text-xl mt-2">No data</h3>
          ) : (
            currentlyUsedPants.map((pant, index) => (
              <div key={index} className="w-full sm:w-2/3 xl:w-1/2 p-4">
                <PantCard pant={pant} type={"use"} />
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
          {loadingPants ? (
            isTab ? (
              dressSkeletonLoadingForDeskop()
            ) : (
              dressSkeletonLoadingForMobile()
            )
          ) : errorWhileLoadingPants || availablePants.length === 0 ? (
            <h3 className="font-bold text-gray-600 text-xl mt-2">No data</h3>
          ) : (
            availablePants.map((pant, index) => (
              <div key={index} className="w-full sm:w-2/3 xl:w-1/2 p-4">
                <PantCard pant={pant} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PantsPage