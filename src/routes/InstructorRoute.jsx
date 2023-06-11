import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import useInstructor from "../hooks/useInstructor";
import { Spinner } from "react-bootstrap";

const InstructorRoute = ({ children }) => {
  const location = useLocation();
  const { user, loader } = useContext(AuthContext);
  const [isInstructor, isInstructorLoading] = useInstructor();
  if (loader || isInstructorLoading) {
    return (
      <>
        <div className="text-center pt-4">
          <Spinner variant="primary"></Spinner>
        </div>
      </>
    );
  }

  if (user && isInstructor) {
    return children;
  }
  return <Navigate to={"/"} state={{ from: location }} replace></Navigate>;
};

export default InstructorRoute;
