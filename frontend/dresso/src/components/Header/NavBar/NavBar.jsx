import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { CgMoreR } from "react-icons/cg";
import { CgMoreVerticalR } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import { removeCredential, setCredentials } from "../../../store/authSlice";
import { useLogoutMutation } from "../../../store/api/userApiSlice";
import { toggleIsOpen } from "../../../store/modileViewSlice";

const NavBar = () => {
  const [logout, { isLoading: loggingOffUser, error: errorWhileLoggingOff }] =
    useLogoutMutation();

  const dispatch = useDispatch();

  const moreOptions = useSelector((state) => state.mobileView.isOpen);

  const { userInfo } = useSelector((state) => state.auth);

  const toggleOptionHandler = () => {
    dispatch(toggleIsOpen());
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
    <nav className="bg-gray-700 flex py-3 justify-between px-6">
      <Link className="font-bold text-white" to="/">
        Jacob
      </Link>
      {userInfo && (
        <div className="flex justify-end space-x-3 text-white font-bold">
          {!isTab && !isDesktop ? (
            <>
              {!moreOptions ? (
                <CgMoreR
                  onClick={(e) => toggleOptionHandler()}
                  className="w-auto h-8"
                />
              ) : (
                <CgMoreVerticalR
                  className="w-auto h-8"
                  onClick={(e) => toggleOptionHandler()}
                />
              )}
            </>
          ) : (
            <>
              <Link to="/profile">Profile</Link>
              <Link to="/about">Shirts</Link>
              <Link to="/testimonials">Pants</Link>
              <Link to="/auth" onClick={(e) => logoutHandler()}>
                Logout
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
