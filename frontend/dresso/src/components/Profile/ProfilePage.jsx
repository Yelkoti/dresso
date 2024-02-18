import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { TiTick } from "react-icons/ti";
import InputText from "../MultiComponents/InputText";
import { useMediaQuery } from "react-responsive";
import { useUpdateUserMutation } from "../../store/api/userApiSlice";
import { setCredentials } from "../../store/authSlice";
import { toast } from "react-toastify";
import ProfilePageSideBar from "./ProfilePageSideBar";
import { CgDetailsMore } from "react-icons/cg";

const ProfilePage = () => {
  const [
    updateUser,
    { isLoading: updatingUserProfile, error: errorWhileUpdating },
  ] = useUpdateUserMutation();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const isTab = useMediaQuery({
    query: "(min-width: 640px)",
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [moreOptions, setMoreOptions] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const sideBarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sideBarRef.current && !sideBarRef.current.contains(e.target)) {
        setMoreOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const nameHandler = async (value) => {
    if (userInfo.name !== value) {
      try {
        const res = await updateUser({
          name: value,
          _id: userInfo?._id,
        }).unwrap();
        console.log(res);
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

  const handleBackgroundClick = (e) => {
    if (e.target.tagName !== "INPUT") {
      e.preventDefault();
    }
  };

  const moreOptionHandler = () => {
    setMoreOptions(false);
  }

  return (
    <div
      className="flex justify-start cursor-pointer relative"
      onClick={(e) => handleBackgroundClick(e)}
    >
      {!isTab ? (
        !moreOptions ? (
          <div className="mt-10">
            <CgDetailsMore onClick={(e) => setMoreOptions(true)} />
          </div>
        ) : (
          <div ref={sideBarRef} className="absolute min-h-40 ml-4 mt-8 bg-gray-200 p-2 rounded-md shadow-xl">
            <ProfilePageSideBar moreOptionHandler={moreOptionHandler} isTab={isTab} />
          </div>
        )
      ) : (
        <div className="flex border min-h-screen p-2 bg-white rounded-r-md shadow-xl">
          <ProfilePageSideBar moreOptionHandler={moreOptionHandler} isTab={isTab} />
        </div>
      )}
      <div
        className="flex flex-col bg-white border p-2 rounded-md shadow-xl space-y-2 flex-1 mx-4"
        style={{ height: `calc(100% - 2px)` }}
      >
        <p className="flex justify-center font-bold text-gray-600">
          User Information
        </p>
        <InputText label="name" value={name} handlerFunc={nameHandler} />
        <InputText label="email" value={email} handlerFunc={emailHandler} />
      </div>
    </div>
  );
};

export default ProfilePage;
