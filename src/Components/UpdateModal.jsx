import React, { useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
const img_hosting_token = import.meta.env.VITE_IMG_BB_TOKEN;

const UpdateModal = ({ course, close, refetch }) => {
  const { user } = useContext(AuthContext);
  const { courseName, availableSeats, price, image } = course || {};
  const [axiosSecure] = useAxiosSecure();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
  const onSubmit = (data, e) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    if (data.image[0]) {
      fetch(img_hosting_url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imageResponse) => {
          // console.log(imageResponse);
          if (imageResponse?.success) {
            const imageUrl = imageResponse?.data?.display_url;
            const newClass = {
              courseName: data.name,
              instructorName: user?.displayName,
              instructorEmail: user?.email,
              availableSeats: parseInt(data.seats),
              price: parseFloat(data.price),
              image: imageUrl,
              status: course?.status,
              enrolledStudents: course?.enrolledStudents,
              feedback: course?.feedback,
            };
            axiosSecure
              .patch(`/courses/${course._id}`, newClass)
              .then((newData) => {
                if (newData?.data.modifiedCount > 0) {
                  refetch();
                  // login success alert
                  swal({
                    title: "Good job!",
                    text: "Course Updated Successfully!",
                    icon: "success",
                    button: "Ok",
                  });
                }
              });
          }
        });
    } else {
      const newClass = {
        courseName: data.name,
        instructorName: user?.displayName,
        instructorEmail: user?.email,
        availableSeats: parseInt(data.seats),
        price: parseFloat(data.price),
        image: course?.image,
        status: course?.status,
        enrolledStudents: course?.enrolledStudents,
        feedback: course?.feedback,
      };
      axiosSecure.patch(`/courses/${course._id}`, newClass).then((newData) => {
        if (newData?.data?.modifiedCount > 0) {
          refetch();
          // update success alert
          swal({
            title: "Good job!",
            text: "Course Updated Successfully!",
            icon: "success",
            button: "Ok",
          });
        }
      });
    }

    // reseting
    e.target.reset();
  };
  return (
    <>
      <Modal
        show={true}
        onHide={() => close(0)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Course Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} className="w-75 mx-auto">
            <Form.Group className="mb-3" controlId="ClassName">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                style={{ padding: "0.5rem" }}
                type="text"
                placeholder="Course Name"
                defaultValue={courseName}
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-danger">
                  Course Name field is required
                </span>
              )}
            </Form.Group>
            <div className="d-flex">
              <div className="w-50 me-3">
                <Form.Group className="mb-3" controlId="InstructorName">
                  <Form.Label>Instructor Name</Form.Label>
                  <Form.Control
                    value={user?.displayName}
                    style={{ padding: "0.5rem" }}
                    type="text"
                    readOnly
                  />
                </Form.Group>
              </div>
              <div className="w-50">
                <Form.Group className="mb-3" controlId="InstructorEmail">
                  <Form.Label>Instructor Email</Form.Label>
                  <Form.Control
                    value={user?.email}
                    style={{ padding: "0.5rem" }}
                    type="text"
                    readOnly
                  />
                </Form.Group>
              </div>
            </div>
            <div className="d-flex">
              <div className="w-50 me-3">
                <Form.Group className="mb-3" controlId="AvailabeSeats">
                  <Form.Label>Available Seats</Form.Label>
                  <Form.Control
                    style={{ padding: "0.5rem" }}
                    type="number"
                    defaultValue={availableSeats}
                    placeholder="Available Seats"
                    {...register("seats", { required: true })}
                  />
                  {errors.seats && (
                    <span className="text-danger">Seats field is required</span>
                  )}
                </Form.Group>
              </div>
              <div className="w-50">
                <Form.Group className="mb-3" controlId="Price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    style={{ padding: "0.5rem" }}
                    type="number"
                    defaultValue={price}
                    placeholder="Price"
                    {...register("price", { required: true })}
                  />
                  {errors.price && (
                    <span className="text-danger">Price field is required</span>
                  )}
                </Form.Group>
              </div>
            </div>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" {...register("image")} />
              {/* {errors.image && (
                <span className="text-danger">Image field is required</span>
              )} */}
            </Form.Group>
            <div className="pb-2">
              <img
                className="img-fluid"
                style={{ height: "3rem" }}
                src={image}
                alt=""
              />
            </div>
            <Button
              className="w-100 fw-bold text-white"
              variant="primary"
              type="submit"
              style={{ padding: "0.5rem 0rem" }}
            >
              Update
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => close(0)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateModal;
