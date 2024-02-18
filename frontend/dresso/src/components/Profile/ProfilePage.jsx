import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import ProfilePageSideBar from "./ProfilePageSideBar";
import { CgDetailsMore } from "react-icons/cg";
import { Outlet } from "react-router-dom";

const ProfilePage = () => {

  const isTab = useMediaQuery({
    query: "(min-width: 640px)",
  });

  const [moreOptions, setMoreOptions] = useState(false);

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
      <Outlet />
    </div>
  );
};

export default ProfilePage;
