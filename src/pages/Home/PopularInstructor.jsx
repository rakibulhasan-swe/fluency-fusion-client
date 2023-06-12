import React, { useEffect, useState } from "react";
import SectionTitle from "../../Components/SectionTitle";
import InstructorCard from "../../Components/InstructorCard";

const PopularInstructor = () => {
  const [instructors, setInstructors] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/popularInstructor")
      .then((res) => res.json())
      .then((data) => setInstructors(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container py-5">
      <SectionTitle heading={"Enroll Now"} subHeading={"Popular Instructors"} />
      <div className="row g-4 d-flex justify-content-center align-items-center pt-5">
        {instructors.length > 0 &&
          instructors.map((data) => (
            <InstructorCard key={data?._id} data={data} />
          ))}
      </div>
    </div>
  );
};

export default PopularInstructor;
