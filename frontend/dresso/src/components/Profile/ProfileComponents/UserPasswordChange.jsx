import React, { useState } from "react";
import { useUpdateUserMutation } from "../../../store/api/userApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserPasswordChange = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const [updateUser, { isLoading: updatingUser, error: errorWhileUpdating}] = useUpdateUserMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password === "" || confirmPassword === "") {
      toast.error("Please Enter password");
      return;
    }
    if(password !== confirmPassword) {
      toast.error("Password is not matched");
      return;
    }
    try {
      const res = await updateUser({ _id: userInfo._id, password: password});
      toast.success("Password is Updated");
      navigate('/profile');
    } catch (error) {
      toast.error(error?.error?.message || error?.message);
    }
  };

  return (
    <form
      action="submit"
      className="flex flex-col bg-white border p-2 rounded-md shadow-xl space-y-2 flex-1 mx-4"
      onSubmit={(e) => submitHandler(e)}
    >
      <p className="font-bold text-gray-600 justify-center flex sm:justify-start text-2xl">Change Password</p>
      <hr />
      <div className="flex flex-col sm:flex-row">
        <p className="mr-2 w-36 font-bold text-gray-600">Password</p>
        <input
          className={`py-1 px-2 border-2 rounded-md focus:shadow-outline-blue`}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col sm:flex-row">
        <p className="mr-2 w-36 font-bold text-gray-600">Confirm Password</p>
        <input
          className={`py-1 px-2 border-2 rounded-md focus:shadow-outline-blue`}
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="flex justify-center sm:justify-start">
        <button className="bg-gray-600 font-bold text-white py-1 px-2 rounded-md hover:bg-gray-400">
          Save
        </button>
      </div>
    </form>
  );
};

export default UserPasswordChange;
