import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import usePurchased from "../../hooks/usePurchased";

const PurchasedCourse = () => {
  // getting user data
  const [purchased] = usePurchased();
  return (
    <div className="container p-5">
      <h2>Total Payments: {purchased.length}</h2>
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
          {purchased?.length > 0 &&
            purchased?.map((course, index) => (
              <PurchasedCourseRow course={course} index={index} />
            ))}
        </tbody>
      </Table>
    </div>
  );
};

const PurchasedCourseRow = ({ course, index }) => {
  // getting enrolled classes
  const [, refetch] = usePurchased();
  const [enrolled, setEnrolled] = useState({});
  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/courses/${course.purchasedId}`)
      .then((res) => res.json())
      .then((data) => setEnrolled(data));
  }, []);
  const { image, courseName, instructorName, instructorEmail, price } =
    enrolled || {};
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
          <Button variant="danger">
            <FaTrash />
          </Button>
        </td>
      </tr>
    </>
  );
};

export default PurchasedCourse;
