import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { CgMoreR } from "react-icons/cg";
import { CgMoreVerticalR } from "react-icons/cg";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeCredential, setCredentials } from "../../../store/authSlice";
import { useLogoutMutation } from "../../../store/api/userApiSlice";

const NavBar = () => {
  const [logout, { isLoading: loggingOffUser, error: errorWhileLoggingOff }] =
    useLogoutMutation();

  const dispatch = useDispatch();

  const [toggleMoreOption, setToggleMoreOption] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const toggleOptionHandler = () => {
    setToggleMoreOption(!toggleMoreOption);
  };

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(removeCredential());
    } catch (error) {}
  };

  const isTab = useMediaQuery({
    query: "(min-width: 640px)",
  });

  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  return (
    <nav className="bg-gray-400 flex py-3 justify-between px-6">
      <Link className="font-bold text-gray-600" to="/">
        Jacob
      </Link>
      {userInfo && (
        <div className="flex justify-end space-x-3">
          {!isTab && !isDesktop ? (
            <>
              {!toggleMoreOption ? (
                <CgMoreR
                  onClick={(e) => toggleOptionHandler()}
                  className="w-auto h-8"
                />
              ) : (
                <div className="flex flex-col relative">
                  <CgMoreVerticalR
                    className="w-auto h-8"
                    onClick={(e) => toggleOptionHandler()}
                  />
                  <div
                    className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 ${
                      toggleMoreOption ? "block" : "hidden"
                    }`}
                    onClick={(e) => toggleOptionHandler()}
                  >
                    <div className="bg-white p-4 rounded-md flex flex-col">
                      <Link to="/">Profile</Link>
                      <Link to="/">Shirts</Link>
                      <Link to="/">Pants</Link>
                      <Link to="/auth" onClick={(e) => logoutHandler()}>
                        Logout
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <Link to="/">Profile</Link>
              <Link to="/about">Shirts</Link>
              <Link to="/testimonials">Pants</Link>
              <Link to="/auth" onClick={(e) => logoutHandler()}>Logout</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
