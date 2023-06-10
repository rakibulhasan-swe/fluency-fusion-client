import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Spinner } from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="text-center pt-5">
        <Spinner variant="primary" />
      </div>
    );
  }
  if (user) {
    return children;
  }
  return (
    <>
      <Navigate to={"/login"} state={{ from: location }} replace />
    </>
  );
};

export default PrivateRoute;
