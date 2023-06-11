import React from "react";
import useManageCourse from "../../hooks/useManageCourse";
import { Button, Table } from "react-bootstrap";
import { GiConfirmed, GiCancel } from "react-icons/gi";
import swal from "sweetalert";

const ManageCourse = () => {
  const [courses, loading, refetch] = useManageCourse();

  // handle approve
  const handleApprove = (id) => {
    fetch(`http://localhost:5000/courses/approve/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.modifiedCount > 0) {
          // data refetch
          refetch();
          // alert
          swal({
            title: "Good job!",
            text: "Course Approved!",
            icon: "success",
            button: "Ok",
          });
        }
      })
      .catch((err) => console.log(err));
  };
  // handle Denied
  const handleDenied = (id) => {
    fetch(`http://localhost:5000/courses/denied/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.modifiedCount > 0) {
          // data refetch
          refetch();
          // alert
          swal({
            title: "Good job!",
            text: "Course Denied!",
            icon: "success",
            button: "Ok",
          });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="container p-5">
        <h2>TOTAL COURSES: {courses.length}</h2>
        <Table striped bordered hover size="lg" className="mt-3" responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Course Name</th>
              <th>Instructor Name</th>
              <th>Instructor Email</th>
              <th>Seats</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {courses?.length > 0 &&
              courses?.map((course, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      style={{ height: "2rem" }}
                      src={course?.image}
                      alt=""
                    />
                  </td>
                  <td>{course?.courseName}</td>
                  <td>{course?.instructorName}</td>
                  <td>{course?.instructorEmail.slice(0, 10)}..</td>
                  <td>{course?.availableSeats}</td>
                  <td>{course?.price}</td>
                  <td>{course?.status}</td>
                  <td>
                    <Button
                      disabled={
                        course?.status === "approved" ||
                        course?.status === "denied"
                          ? true
                          : false
                      }
                      variant="success"
                      onClick={() => handleApprove(course?._id)}
                    >
                      <GiConfirmed />
                    </Button>
                    <Button
                      disabled={
                        course?.status === "denied" ||
                        course?.status === "approved"
                          ? true
                          : false
                      }
                      className="ms-2 my-1"
                      variant="danger"
                      onClick={() => handleDenied(course?._id)}
                    >
                      <GiCancel />
                    </Button>
                    <Button
                      className="ms-2 my-1"
                      onClick={() => handleFeedback(course?._id)}
                    >
                      Feedback
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ManageCourse;
