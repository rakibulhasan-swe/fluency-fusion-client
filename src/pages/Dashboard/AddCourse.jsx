import React, { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";

const img_hosting_token = import.meta.env.VITE_IMG_BB_TOKEN;

const AddCourse = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);
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
            status: "pending",
            enrolledStudents: 0,
            feedback: "",
          };
          axiosSecure.post("/courses", newClass).then((newData) => {
            if (newData?.data?.insertedId) {
              // login success alert
              swal({
                title: "Good job!",
                text: "New Class Added Successfully!",
                icon: "success",
                button: "Ok",
              });
            }
          });
        }
      });

    // reseting
    e.target.reset();
  };
  return (
    <>
      <div className="pt-5">
        <h2 className="text-center pb-3">Add a New Course</h2>
        {/* forms */}
        <Form onSubmit={handleSubmit(onSubmit)} className="w-75 mx-auto">
          <Form.Group className="mb-3" controlId="ClassName">
            <Form.Label>Course Name*</Form.Label>
            <Form.Control
              style={{ padding: "0.5rem" }}
              type="text"
              placeholder="Course Name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-danger">Course Name field is required</span>
            )}
          </Form.Group>
          <div className="d-flex">
            <div className="w-50 me-3">
              <Form.Group className="mb-3" controlId="InstructorName">
                <Form.Label>Instructor Name*</Form.Label>
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
                <Form.Label>Instructor Email*</Form.Label>
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
                <Form.Label>Available Seats*</Form.Label>
                <Form.Control
                  style={{ padding: "0.5rem" }}
                  type="number"
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
                <Form.Label>Price*</Form.Label>
                <Form.Control
                  style={{ padding: "0.5rem" }}
                  type="number"
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
            <Form.Label>Image*</Form.Label>
            <Form.Control
              type="file"
              {...register("image", { required: true })}
            />
            {errors.image && (
              <span className="text-danger">Image field is required</span>
            )}
          </Form.Group>
          <Button
            className="w-100 fw-bold text-white"
            variant="primary"
            type="submit"
            style={{ padding: "0.5rem 0rem" }}
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddCourse;
