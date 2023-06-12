import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Button, Table } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  // getting user data
  const [axiosSecure] = useAxiosSecure();
  const { data: payments = [], refetch } = useQuery(["payments"], async () => {
    const res = await axiosSecure.get(`/payments?email=${user?.email}`);
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
            <th>Date</th>
            <th>Transaction Id</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {payments?.length > 0 &&
            payments?.map((details, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user?.displayName}</td>
                <td>{details?.date}</td>
                <td>{details?.transactionId}</td>
                <td>
                  <Button variant="danger">
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
