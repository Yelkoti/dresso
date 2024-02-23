import React, { useState } from "react";
// import ToggleButton from "../../MultiComponents/ToggleButton";
import { Link } from "react-router-dom";
import { useUpdatePantMutation } from "../../../store/api/pantApiSlice";
import { toast } from "react-toastify";
import Timer from "../../MultiComponents/Timer";

const data = {
  toggle: true,
};

const PantsCard = ({ pant, type }) => {
  const [tog, setTog] = useState(pant.isWashed);

  const borderClass =
    type === "wash"
      ? "border-4 border-red-600"
      : type === "use"
      ? "border-4 border-green-600"
      : "border-4 border-yellow-600";

  const [
    updatePant,
    // { isLoading: updatingPantStatus, error: ErrorWhileUpdatingPantStatus },
  ] = useUpdatePantMutation();

  const toggleHandler = async () => {
    try {
      await updatePant({ id: pant._id, data }).unwrap();
      setTog(!tog);
    } catch (error) {
      toast.error("Error While updating Pant status");
    }
  };

  return (
    <div
      className={`flex flex-col items-start ${borderClass} bg-white rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700`}
    >
      <img
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        src={pant.image}
        alt=""
      />
      <div className="flex flex-col justify-start items-start p-4 leading-normal">
        <Link
          to={`/pant/${pant._id}`}
          className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {pant.name}
        </Link>
        <p className="mb-3 font-bold text-gray-600 dark:text-gray-400">
          {pant.description}
        </p>
        <p className="font-semibold text-gray-600">{pant.note}</p>
        {/* <ToggleButton
          label={"Wash"}
          checkedValue={tog}
          toggleHandler={toggleHandler}
        />
        <ToggleButton
          label={"Use"}
          checkedValue={!tog}
          toggleHandler={toggleHandler}
        /> */}
        {pant?.usedOn !== null && (
          <Timer usedTimeInMilliseconds={pant.usedOn} type={type} />
        )}
        <button
          className="font-bold p-2 bg-gray-600 rounded-md mt-2 text-white hover:bg-gray-400"
          onClick={(e) => toggleHandler()}
        >
          {tog ? "use" : "wash"}
        </button>
      </div>
    </div>
  );
};

export default PantsCard;