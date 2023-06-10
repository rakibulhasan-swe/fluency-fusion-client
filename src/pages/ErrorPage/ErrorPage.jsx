import React from "react";
import errorImage from "../../assets/404.png";
import { Link, useRouteError } from "react-router-dom";
import Head from "../../Components/Head";

const ErrorPage = () => {
  const { error, status } = useRouteError();
  return (
    <>
      <Head title={"404 not found"} />
      <div className="container pt-3">
        <div className="">
          <img
            src={errorImage}
            className="img-fluid w-100"
            alt=""
            style={{ height: "30rem", objectFit: "cover" }}
          />
          <div className="text-center pt-3">
            <h2 className="fw-bold">{status || 404}</h2>
            <p>{error?.message}</p>
            <Link className="btn btn-primary px-4 py-2" to={"/"}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
