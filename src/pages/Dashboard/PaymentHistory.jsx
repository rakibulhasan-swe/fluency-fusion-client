import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Button, Table } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

const PaymentHistory = () => {
  // getting user data
  const [axiosSecure] = useAxiosSecure();
  const { data: payments = [], refetch } = useQuery(["payments"], async () => {
    const res = await axiosSecure.get("/payments");
    return res.data;
  });
  return (
    <div className="container p-5">
      <h2>Total Payments: {payments.length}</h2>
      <Table striped bordered hover size="lg" className="mt-3" responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course Name</th>
            <th>Instructor Name</th>
            <th>Transaction Id</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {payments?.length > 0 &&
            payments?.map((details, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{details?.userName}</td>
                <td>{details?.email}</td>
                <td>{details?.courseName}</td>
                <td>{details?.instructorName}</td>
                <td>{details?.transactionId}</td>
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

export default PaymentHistory;
