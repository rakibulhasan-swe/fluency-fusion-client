import React, { useEffect, useState } from "react";
import useEnrolled from "../../hooks/useEnrolled";
import { Button, Table } from "react-bootstrap";
import { FaTrash, FaWallet } from "react-icons/fa";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const SelectedCourse = () => {
  const [enrolled] = useEnrolled();
  return (
    <div className="container p-5">
      <h2>Total Selected Courses: {enrolled.length}</h2>
      <Table striped bordered hover size="lg" className="mt-3" responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Course Name</th>
            <th>Instructor Name</th>
            <th>Instructor Email</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {enrolled?.length > 0 &&
            enrolled?.map((course, index) => (
              <SelectedCourseRow course={course} index={index} />
            ))}
        </tbody>
      </Table>
    </div>
  );
};

const SelectedCourseRow = ({ course, index }) => {
  // getting enrolled classes
  const [, refetch] = useEnrolled();
  const [enrolled, setEnrolled] = useState({});
  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/courses/${course.courseId}`)
      .then((res) => res.json())
      .then((data) => setEnrolled(data));
  }, []);
  const { image, courseName, instructorName, instructorEmail, price } = enrolled || {};
  // delete course
  const handleDelete = (id) => {
    swal({
      title: "Are you sure",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        console.log(id);
        fetch(`${import.meta.env.VITE_URL}/enrolled/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data?.deletedCount > 0) {
              refetch();
              // alert
              swal({
                title: "Good job!",
                text: "Course deleted successfully",
                icon: "success",
                button: "Ok",
              });
            }
          });
      }
    });
  };
  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>
          <img src={image} style={{ height: "2.4rem" }} alt="" />
        </td>
        <td>{courseName}</td>
        <td>{instructorName}</td>
        <td>{instructorEmail}</td>
        <td>${price}</td>
        <td>
          <Link to={`/dashboard/payment/${course?.courseId}`}>
            <Button className="me-1 my-1" variant="primary">
              <FaWallet /> Pay
            </Button>
          </Link>
          <Button variant="danger" onClick={() => handleDelete(course?._id)}>
            <FaTrash />
          </Button>
        </td>
      </tr>
    </>
  );
};

export default SelectedCourse;
