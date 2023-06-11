import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import { Spinner } from "react-bootstrap";

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const { user, loader } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  if (loader || isAdminLoading) {
    return (
      <>
        <div className="text-center pt-4">
          <Spinner variant="primary"></Spinner>
        </div>
      </>
    );
  }

  if (user && isAdmin) {
    return children;
  }
  return <Navigate to={"/"} state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
