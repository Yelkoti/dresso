import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAddPantMutation } from "../../../store/api/pantApiSlice";
import { useNavigate } from "react-router-dom";

const AddPant = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [
    addPant,
    { isLoading: addingPantDetails, error: errorWhileAddingPant },
  ] = useAddPantMutation();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await addPant({
        image: imageSrc,
        name,
        description,
      }).unwrap();
      toast.success("Added Pant Details");
      navigate("/profile");
    } catch (error) {
      toast.error("Something went wrong while adding Pant Details");
    }
  };

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImageSrc(reader.result);
    };
    reader.onerror = (error) => {
      toast.error("Image not uploaded");
    };
  };

  return (
    <form
      action="submit"
      className="flex flex-col bg-white border p-2 rounded-md shadow-xl space-y-2 flex-1 mx-4 w-[50%]"
      onSubmit={(e) => submitHandler(e)}
    >
      <p className="font-bold text-gray-600 justify-center flex sm:justify-start text-2xl">
        Add Pant
      </p>
      <hr />
      <div className="flex flex-col sm:flex-row">
        <p className="mr-2 w-24 font-bold text-gray-600">Image</p>
        <input
          className={`py-1 px-2 border-2 font-bold text-gray-600 rounded-md focus:shadow-outline-blue`}
          type="file"
          onChange={(e) => imageHandler(e)}
          accept="image/jpeg, image/png, image/jpg"
        />
      </div>
      <div className="flex flex-col sm:flex-row">
        <p className="mr-2 w-24 font-bold text-gray-600">Name</p>
        <input
          className={`py-1 px-2 border-2 rounded-md focus:shadow-outline-blue`}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col sm:flex-row">
        <p className="mr-2 w-24 font-bold text-gray-600">Description</p>
        <input
          className={`py-1 px-2 border-2 rounded-md focus:shadow-outline-blue`}
          type="text"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex justify-center sm:justify-start">
        <button className="bg-gray-600 text-white py-1 px-2 rounded-md hover:bg-gray-400">
          Add
        </button>
      </div>
    </form>
  );
};

export default AddPant;
