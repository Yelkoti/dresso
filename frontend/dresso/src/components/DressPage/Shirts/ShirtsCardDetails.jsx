import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetShirtDetailsQuery } from '../../../store/api/shirtApiSlice';

const ShirtsCardDetails = () => {
  const { id: shirtId } = useParams();

  const {data: shirt, isLoading: shirtDataLoading, error: errorWhileLoadingShirtData} = useGetShirtDetailsQuery(shirtId);
  console.log(shirt);

  return (
    <div className="sm:w-[80%] sm:m-auto space-y-2">
      <div className="flex p-4 flex-col sm:m-auto sm:flex-row bg-white rounded-md hover:shadow-md">
        {/* image */}
        <img src="https://imgs.search.brave.com/Ghim0FmzNoQcdru9qOkn88KqnABHBhSVHN0y7qyOW4w/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/NzE5NDUxNTMyMzct/NDkyOWU3ODNhZjRh/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TVRWOGZI/UWxNakJ6YUdseWRI/eGxibnd3Zkh3d2ZI/eDhNQT09" className="rounded-md sm:w-[100%] lg:w-[40%]" />
        <div className="p-2 font-semibold text-gray-800 md:m-auto">
          <p>
            Add your Shirt and keep a track of it. Move your Shirt accourdingly
            from washed to unwashed, and keep the track of number of days it is
            been used.
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <Link
              to="/profile/shirt"
              className="bg-gray-600 text-white rounded-md py-1 px-2 hover:bg-gray-400 hover:shadow-lg"
            >
              Add Shirt
            </Link>
            <Link
              to="/shirt"
              className="bg-gray-600 text-white rounded-md py-1 px-2 hover:bg-gray-400 hover:shadow-lg"
            >
              Track Shirts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShirtsCardDetails;
