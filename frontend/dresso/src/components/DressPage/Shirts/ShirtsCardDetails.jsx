import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetShirtDetailsQuery } from "../../../store/api/shirtApiSlice";
import InputText from "../../MultiComponents/InputText";
import InputTextArea from "../../MultiComponents/InputTextArea";
import Timer from "../../MultiComponents/Timer";
import { getDaysDifference } from "../../MultiComponents/Utils/timerUtils";
import { useUpdateShirtsMutation } from "../../../store/api/shirtApiSlice";
import { toast } from "react-toastify";

const ShirtsCardDetails = () => {
  const { id: shirtId } = useParams();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("-");
  const [time, setTime] = useState(null);
  const [isWashed, setIsWashed] = useState(false);
  const [limit, setLimit] = useState();

  const [updateShirt] = useUpdateShirtsMutation();

  const {
    data: shirt,
    refetch,
    isLoading: shirtDataLoading,
    error: errorWhileLoadingShirtData,
  } = useGetShirtDetailsQuery(shirtId);

  useEffect(() => {
    if (shirt) {
      setName(shirt.name);
      setImage(shirt.image);
      setDescription(shirt.description);
      setIsWashed(shirt.isWashed);
      setLimit(shirt.limit);
      setTime(shirt.usedOn);
    }
  }, [shirt]);

  const getType = () => {
    if (isWashed) return "";
    const daysDifference = getDaysDifference(time);
    return daysDifference >= limit ? "wash" : "";
  };

  const limitButtonsHandler = async (action) => {
    if (action === "incr") {
      try {
        await updateShirt({
          id: shirt._id,
          data: { limit: limit + 1 },
        }).unwrap();
        setLimit(limit + 1);
      } catch (error) {}
    } else if (action === "decr") {
      if (limit === 1) return;
      try {
        await updateShirt({
          id: shirt._id,
          data: { limit: limit - 1 },
        }).unwrap();
        setLimit(limit - 1);
      } catch (error) {}
    }
  };

  const nameHandler = async (value) => {
    if (name !== value) {
      try {
        await updateShirt({
          id: shirt._id,
          data: { name: value },
        }).unwrap();
        setName(value);
        toast.success("Shirt name updated");
      } catch (err) {
        toast.error("Can't able to update name");
        setName(name);
      }
    }
  };

  const noteAndDescriptionHandler = async (change, value) => {
    if (change === "note" && note === value) {
      return;
    } else if (change === "description" && description === value) {
      return;
    }
    try {
      const updateData =
        change === "note" ? { note: value } : { description: value };
      await updateShirt({
        id: shirt._id,
        data: updateData,
      }).unwrap();
      if (change === "note") {
        setNote(value);
      } else if (change === "description") {
        setDescription(value);
      }
      toast.success(`Shirt ${change} updated`);
    } catch (error) {
      toast.error(`Can't able to update ${change}`);
    }
  };

  const washUseHandler = async () => {
    try {
      await updateShirt({id: shirtId, data: {"toggle": true}}).unwrap();
      refetch();
      toast.success(`Marked shirt as ${isWashed ? "use" : "wash"}`);
    } catch (error) {
      toast.error(`Error while marking shirt as ${isWashed ? "use" : "wash"}`);
    }
  }

  return shirtDataLoading ? (
    <p>Loading</p>
  ) : (
    <div className="sm:w-[80%] sm:m-auto space-y-2">
      <div className="flex p-4 flex-col sm:m-auto sm:flex-row bg-white rounded-md hover:shadow-md">
        <img
          src={image}
          alt={name}
          className="rounded-md sm:w-[100%] lg:w-[40%]"
        />
        <div className="p-2 space-y-4 w-[100%] font-semibold text-gray-800">
          <InputText label={"name"} value={name} handlerFunc={nameHandler} />
          <InputTextArea
            label={"description"}
            value={description}
            handlerFunc={noteAndDescriptionHandler}
          />
          <InputTextArea
            label={"note"}
            value={note}
            handlerFunc={noteAndDescriptionHandler}
          />
          {shirt?.usedOn !== null && (
            <Timer usedTimeInMilliseconds={shirt.usedOn} type={getType()} />
          )}
          <div className="relative flex items-center max-w-[11rem]">
            <button
              type="button"
              className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
              onClick={() => limitButtonsHandler("decr")}
            >
              <svg
                className="w-3 h-3 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h16"
                />
              </svg>
            </button>
            <input
              type="text"
              data-input-counter
              data-input-counter-min="1"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pb-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              value={limit}
              required
            />
            <div className="absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse">
              <span>Limit Days</span>
            </div>
            <button
              type="button"
              className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
              onClick={() => limitButtonsHandler("incr")}
            >
              <svg
                className="w-3 h-3 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
          <button
            className="font-bold p-2 bg-gray-600 rounded-md mt-2 text-white hover:bg-gray-400"
            onClick={(e) => washUseHandler()}
          >
            {isWashed ? "use" : "wash"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShirtsCardDetails;
