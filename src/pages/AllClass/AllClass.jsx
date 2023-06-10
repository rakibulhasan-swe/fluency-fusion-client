import React from "react";
import Cover from "../shared/Cover";
import DynamicTitle from "../../Components/DynamicTitle";
import CourseCard from "../../Components/CourseCard";

const AllClass = () => {
  return (
    <div>
      <DynamicTitle title={"Classes"} />
      <Cover title={"All Course's"} />
      <CourseCard />
    </div>
  );
};

export default AllClass;
