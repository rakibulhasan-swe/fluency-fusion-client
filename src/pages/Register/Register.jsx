import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import signUpImg from "../../assets/others/authentication1.png";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import swal from "sweetalert";
import SocialLogin from "../shared/SocialLogin";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, updateUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // creating user
  const onSubmit = (data, e) => {
    createUser(data.email, data.password)
      .then((result) => {
        // updating in ui
        result.user.displayName = data?.name;
        result.user.photoURL = data?.photoURL;
        // updating user name
        updateUser(data.name, data?.photoURL)
          .then(() => {
            const savedUser = { name: data?.name, email: data?.email };
            fetch("http://localhost:5000/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(savedUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  // login success alert
                  swal({
                    title: "Good job!",
                    text: "Registration Successfull!",
                    icon: "success",
                    button: "Ok",
                  });
                }
              });
          })
          .catch((err) => console.log(err));
        // navigate to home
        navigate("/");
      })
      .catch((err) => console.log(err));

    // reseting form values
    e.target.reset();
  };
  return (
    <div>
      <>
        <div className="container-fluid bg-login d-flex justify-content-center align-items-center">
          <div className="container py-5">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-lg-6">
                <h3 className="text-center fs-2 pb-3">Sign Up</h3>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      style={{ padding: "0.7rem" }}
                      type="text"
                      placeholder="Enter your name"
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <span className="text-danger">
                        Name field is required
                      </span>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>PhotoURL</Form.Label>
                    <Form.Control
                      style={{ padding: "0.7rem" }}
                      type="text"
                      placeholder="Enter your photo url"
                      {...register("photoURL", { required: true })}
                    />
                    {errors.photoURL && (
                      <span className="text-danger">
                        Photo URL field is required
                      </span>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      style={{ padding: "0.7rem" }}
                      type="email"
                      placeholder="Enter email"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <span className="text-danger">
                        Email field is required
                      </span>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      style={{ padding: "0.7rem" }}
                      type="password"
                      placeholder="Enter Password"
                      {...register("password", {
                        pattern: /^(?=.*?[A-Z])(?=.*?[#?!@$%^&*-]).{6,}$/,
                        required: true,
                      })}
                    />
                    {errors.password && (
                      <span className="text-danger">
                        Please input at least one uppercase letter and a special
                        characters.
                      </span>
                    )}
                  </Form.Group>
                  <Button
                    className="w-100 fw-bold text-white"
                    variant="primary"
                    type="submit"
                    style={{ padding: "0.7rem 0rem" }}
                  >
                    Submit
                  </Button>
                </Form>
                <div className="text-center pt-3">
                  <Link
                    to={"/login"}
                    className="d-text fw-semibold text-decoration-none"
                  >
                    Already Registerd? Go to login
                  </Link>
                  <p className="pt-2">or sign in with</p>
                  <div>
                    <SocialLogin />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <img src={signUpImg} className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Register;
