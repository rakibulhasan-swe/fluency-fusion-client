import React, { useContext, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { FaGraduationCap } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [currentRole, setCurrentRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/allAdminOrInstructor`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.length > 0 && user?.email) {
          const current = data?.find(
            (singleUser) => singleUser.email === user?.email
          );
          // console.log(user?.email);
          setLoading(false);
          setCurrentRole(current?.role);
        }
      });
  }, [user]);
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
      if (user) {
        const { _id } = course;
        // giving two extra value
        const enrolledCourse = {
          userEmail: user?.email,
          userName: user?.displayName,
          courseId: _id,
        };
        // creating enrolled courses
        fetch(`${import.meta.env.VITE_URL}/enrolled`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(enrolledCourse),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data?.insertedId) {
              swal({
                title: "Good job!",
                text: "Course Enrolled Successfully!",
                icon: "success",
                button: "ok",
              });
            }
          });
      }
    } else {
      swal({
        title: "You need to login first",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          navigate("/login", { replace: true });
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
              {loading ? (
                "loading..."
              ) : (
                <Button
                  className="btn-primary"
                  disabled={
                    !availableSeats || currentRole !== "student" ? true : false
                  }
                  onClick={() => handleEnrolled(course)}
                >
                  Enroll Now
                </Button>
              )}
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default CourseCard;
