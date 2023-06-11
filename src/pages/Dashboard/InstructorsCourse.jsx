import React, { useContext, useState } from "react";
import { Button, Table } from "react-bootstrap";
import useCourse from "../../hooks/useCourse";
import { FaUpload } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import UpdateModal from "../../Components/UpdateModal";

const InstructorsCourse = () => {
  const { user } = useContext(AuthContext);
  const [courses, refetch] = useCourse();
  const [showModal, setShowModal] = useState(0);

  return (
    <div className="container p-5">
      <h2>Total Courses: {courses.length}</h2>
      <Table striped bordered hover size="lg" className="mt-3" responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Course Name</th>
            <th>Instructor's Email</th>
            <th>Course Price</th>
            <th>Enrolled</th>
            <th>Feedback</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses?.length > 0 &&
            courses?.map((course, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{course?.courseName}</td>
                <td>{course?.instructorEmail}</td>
                <td>{course?.price}</td>
                <td>{course?.enrolledStudents}</td>
                <td>{course?.feedback ? course?.feedback : "No feedback"}</td>
                <td>{course?.status}</td>
                <td>
                  <Button onClick={() => setShowModal(course?._id)}>
                    <FaUpload />
                  </Button>
                </td>
                {showModal === course?._id ? (
                  <UpdateModal
                    course={course}
                    close={setShowModal}
                    refetch={refetch}
                  />
                ) : (
                  ""
                )}
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default InstructorsCourse;
