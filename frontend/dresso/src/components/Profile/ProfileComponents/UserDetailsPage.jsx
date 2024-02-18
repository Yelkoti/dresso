import React, { useEffect, useState } from "react";
import InputText from "../../MultiComponents/InputText";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../../../store/api/userApiSlice";
import { setCredentials } from "../../../store/authSlice";
import { toast } from "react-toastify";

const UserDetailsPage = () => {
  const [
    updateUser,
    { isLoading: updatingUserProfile, error: errorWhileUpdating },
  ] = useUpdateUserMutation();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const nameHandler = async (value) => {
    if (userInfo.name !== value) {
      try {
        const res = await updateUser({
          name: value,
          _id: userInfo?._id,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Name updated");
      } catch (err) {
        toast.error(err?.error?.message || err?.message);
      }
    }
  };

  const emailHandler = async (value) => {
    if (userInfo.email !== value) {
      try {
        const res = await updateUser({ email: value, _id: userInfo._id });
        dispatch(setCredentials(res));
        toast.success("Email updated");
      } catch (error) {
        toast.error(error?.error?.message || error?.message);
      }
    }
  };

  return (
    <div
      className="flex flex-col bg-white border p-2 rounded-md shadow-xl space-y-2 flex-1 mx-4"
      style={{ height: `calc(100% - 2px)` }}
    >
      <p className="flex justify-center sm:justify-start font-bold text-gray-600 text-2xl">
        User Information
      </p>
      <hr />
      <InputText label="name" value={name} handlerFunc={nameHandler} />
      <InputText label="email" value={email} handlerFunc={emailHandler} />
    </div>
  );
};

export default UserDetailsPage;
