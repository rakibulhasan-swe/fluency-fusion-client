import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaTrash, FaUsers } from "react-icons/fa";
import swal from "sweetalert";

const ManageUser = () => {
  // getting user data
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("http://localhost:5000/users").then((res) => res.json()),
  });

  // delete user
  const handleDelete = (id) => {
    swal({
      title: "Are you sure",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:5000/users/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              // alert
              swal({
                title: "Good job!",
                text: "User deleted successfully",
                icon: "success",
                button: "Ok",
              });
            }
          });
      }
    });
  };
  // make admin
  const handleMakeAdmin = (id) => {
    fetch(`http://localhost:5000/users/admin/${id}`, {
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
            text: "User updated to Admin",
            icon: "success",
            button: "Ok",
          });
        }
      })
      .catch((err) => console.log(err));
  };
  // make handleMakeInstructtor
  const handleMakeInstructor = (id) => {
    fetch(`http://localhost:5000/users/instructor/${id}`, {
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
            text: "User updated to Instructor",
            icon: "success",
            button: "Ok",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container p-5">
      <h2>TOTAL USERS: {users.length}</h2>
      <Table striped bordered hover size="lg" className="mt-3" responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Roll</th>
            <th>Make Admin or Instructor</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.length > 0 &&
            users?.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user?.role === "admin" ? (
                    <p>Admin</p>
                  ) : (
                    <>
                      {user?.role === "instructor" ? (
                        <p>Instructor</p>
                      ) : (
                        <p>Student</p>
                      )}
                    </>
                  )}
                </td>
                <td>
                  <Button
                    disabled={user?.role === "admin" ? true : false}
                    onClick={() => handleMakeAdmin(user?._id)}
                  >
                    Admin
                  </Button>
                  <Button
                    disabled={user?.role === "instructor" ? true : false}
                    onClick={() => handleMakeInstructor(user?._id)}
                    className="ms-2 my-1"
                  >
                    Instructor
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(user?._id)}
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

export default ManageUser;
