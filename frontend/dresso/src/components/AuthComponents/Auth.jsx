import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const Auth = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    userInfo ? <Outlet /> : <Navigate to='/auth' replace />
  );
};

export default Auth;
