import React, { useEffect, useState } from "react";
import Cover from "../shared/Cover";
import DynamicTitle from "../../Components/DynamicTitle";
import InstructorCard from "../../Components/InstructorCard";

const Instructor = () => {
  const [instructors, setInstructor] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/allInstructor")
      .then((res) => res.json())
      .then((data) => setInstructor(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <DynamicTitle title={"Instructor's"} />
      <Cover title={"Our Instructor's"} />
      <div className="container py-5">
        <div className="row g-4">
          {instructors?.map((data) => (
            <InstructorCard key={data._id} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Instructor;
