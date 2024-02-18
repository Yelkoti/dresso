import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom";


const ProfilePageSideBar = ({moreOptionHandler, isTab}) => {

  const location = useLocation();
  const [url, setUrl] = useState(null);

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  const activeClass = `${isTab ? "bg-gray-200" : "bg-white"} p-1 rounded-md` ;

  return (
    <ul className='flex flex-col sm:w-52 font-bold text-gray-600 p-2 space-y-2'>
        <Link to='/profile' className={`${url === "/profile" ? activeClass : ""}`} onClick={(e) => moreOptionHandler()}>My Details</Link>
        <Link to='/profile/password' className={`${url === "/profile/password" ? activeClass : ""}`} onClick={(e) => moreOptionHandler()}>Change Password</Link>
        <Link to='/profile/shirt' className={`${url === "/profile/shirt" ? activeClass : ""}`} onClick={(e) => moreOptionHandler()}>Add Shirt</Link>
        <Link to='/profile/pant' className={`${url === "/profile/pant" ? activeClass : ""}`} onClick={(e) => moreOptionHandler()}>Add Pant</Link>
    </ul>
  )
}

export default ProfilePageSideBar