import React from "react";
import Cover from "../shared/Cover";
import DynamicTitle from "../../Components/DynamicTitle";
import CourseCard from "../../Components/CourseCard";
import useClass from "../../hooks/useClass";

const AllClass = () => {
  const [allClass] = useClass();
  return (
    <>
      <DynamicTitle title={"Classes"} />
      <Cover title={"All Course's"} />
      <div className="container py-5">
        <div className="row g-4 d-flex justify-content-center align-items-center">
          {allClass.length > 0 &&
            allClass.map((course) => (
              <CourseCard key={course?._id} course={course} />
            ))}
        </div>
      </div>
    </>
  );
};

export default AllClass;
