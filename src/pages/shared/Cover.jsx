import React from "react";

const Cover = ({ title }) => {
  return (
    <div>
      <div className="cover-bg d-flex justify-content-center align-items-center">
        <div>
          <h2 className="fs-2 fw-semibold text-dark">{title}</h2>
        </div>
      </div>
    </div>
  );
};

export default Cover;
