import React, { useEffect, useState } from "react";
import SectionTitle from "../../Components/SectionTitle";
import CourseCard from "../../Components/CourseCard";

const PopularClass = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/popularCourses`)
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container py-5">
      <SectionTitle heading={"Enroll Now"} subHeading={"Popular Courses"} />
      <div className="row g-4 d-flex justify-content-center align-items-center pt-5">
        {courses.length > 0 &&
          courses.map((course) => (
            <CourseCard key={course?._id} course={course} />
          ))}
      </div>
    </div>
  );
};

export default PopularClass;
