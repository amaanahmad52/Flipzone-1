import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.users);
    
  return (
    <>
      {loading === false && (
        isAdmin && user.role === 'admin' ? (
          <Outlet />
        ) : (
          <Navigate to='/login' />
        )
      )}
    </>
  );
};

export default ProtectedRoute;
