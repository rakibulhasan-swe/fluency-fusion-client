import React from "react";
import { Button, Table } from "react-bootstrap";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";

const PurchasedCourse = () => {
  // getting user data
  const [axiosSecure] = useAxiosSecure();
  const { data: purchasedCourse = [], refetch } = useQuery(
    ["purchasedCourse"],
    async () => {
      const res = await axiosSecure.get("/purchasedCourse");
      return res.data;
    }
  );
  return (
    <div className="container p-5">
      <h2>Total Payments: {purchasedCourse.length}</h2>
      <Table striped bordered hover size="lg" className="mt-3" responsive>
        <thead>
          <tr>
            <th>#</th>
            <td>Image</td>
            <th>Name</th>
            <th>Email</th>
            <th>Course Name</th>
            <th>Instructor Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {purchasedCourse?.length > 0 &&
            purchasedCourse?.map((details, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={details?.image}
                    style={{ height: "2.4rem" }}
                    alt=""
                  />
                </td>
                <td>{details?.userName}</td>
                <td>{details?.email}</td>
                <td>{details?.courseName}</td>
                <td>{details?.instructorName}</td>
                <td>{details?.price}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(details?._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PurchasedCourse;
