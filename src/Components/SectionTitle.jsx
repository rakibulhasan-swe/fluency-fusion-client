import React from "react";

const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="text-center">
      <span className="d-text">{heading}</span>
      <h2 className="fw-semibold">{subHeading}</h2>
    </div>
  );
};

export default SectionTitle;
