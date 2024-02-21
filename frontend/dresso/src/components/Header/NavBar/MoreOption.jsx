import React, { useEffect, useState } from "react";
import { useLogoutMutation } from "../../../store/api/userApiSlice";
import { removeCredential } from "../../../store/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleIsOpen } from "../../../store/modileViewSlice";
import { useLocation } from "react-router-dom";

const MoreOption = () => {
  const location = useLocation();

  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(location.pathname)
  }, [location]);

  const moreOptions = useSelector((state) => state.mobileView.isOpen);

  const dispatch = useDispatch();

  const [logout, { isLoading: loggingOffUser, error: errorWhileLoggingOff }] =
    useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(removeCredential());
    } catch (error) {}
  };

  const toggleOptionHandler = () => {
    dispatch(toggleIsOpen());
  };

  return (
    <div className="flex flex-col relative">
      <div
        className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 ${
          moreOptions ? "block" : "hidden"
        }`}
        onClick={(e) => toggleOptionHandler()}z
      >
        <div className="bg-white p-4 rounded-md flex flex-col text-gray-600 mobile-view absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <Link to="/profile">Profile</Link>
          <Link to="/shirt">Shirts</Link>
          <Link to="/pant">Pants</Link>
          <Link to="/auth" onClick={(e) => logoutHandler()}>
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MoreOption;
