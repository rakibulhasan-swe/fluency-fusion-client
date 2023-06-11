import React from "react";
import { Table } from "react-bootstrap";
import useCourse from "../../hooks/useCourse";

const InstructorsCourse = () => {
  const [courses, refetch] = useCourse();
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
            <th>Enrolled Students</th>
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
                <td>{course.className}</td>
                <td>{course.instructorEmail}</td>
                <td>{course.price}</td>
                <td>{course.enrolledStudents}</td>
                <td>{course.feedback}</td>
                <td>{course.status}</td>
                <td>Update</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default InstructorsCourse;
