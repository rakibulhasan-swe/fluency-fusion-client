import React, { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { FaGraduationCap } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";
import swal from "sweetalert";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";
import useEnrolled from "../hooks/useEnrolled";

const CourseCard = ({ course }) => {
  const { user } = useContext(AuthContext);
  const [enrolled, refetch] = useEnrolled();
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const {
    courseName,
    instructorName,
    enrolledStudents,
    availableSeats,
    price,
    image,
  } = course;
  const handleEnrolled = (course) => {
    if (user) {
      // giving two extra value
      const enrolledCourse = {
        userEmail: user?.email,
        userName: user?.displayName,
        ...course,
      };
      // creating enrolled courses
      fetch("http://localhost:5000/enrolled", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(enrolledCourse),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.insertedId) {
            refetch(); // updating the enrolled number
            swal({
              title: "Good job!",
              text: "Course Enrolled Successfully!",
              icon: "success",
              button: "ok",
            });
          }
        });
    }
  };
  return (
    <>
      <div className="col-lg-4 col-md-6">
        <Card
          className={
            availableSeats ? "border-0 shadow" : "border-0 shadow bg-danger"
          }
        >
          <Card.Img variant="top" src={image} />
          <Card.Body className="p-4">
            <Card.Title className="fw-semibold">{courseName}</Card.Title>
            <Card.Text className="fw-light">
              Instructor: {instructorName}
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center py-2">
              <Card.Text className="fw-semibold">
                <FaGraduationCap className="fs-4 me-1 d-text" />
                {availableSeats} Seats
              </Card.Text>
              <Card.Text className="fw-semibold">${price}</Card.Text>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <Card.Text>Enrolled: {enrolledStudents}</Card.Text>
              <Button
                className="btn-primary"
                disabled={
                  !availableSeats || isAdmin || isInstructor ? true : false
                }
                onClick={() => handleEnrolled(course)}
              >
                Enroll Now
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default CourseCard;
