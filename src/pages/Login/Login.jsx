import React, { useContext, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import swal from "sweetalert";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import SocialLogin from "../shared/SocialLogin";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/Ai";
import DynamicTitle from "../../Components/DynamicTitle";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loginError, setLoginError] = useState("");
  const [show, setShow] = useState(false);
  // redirect location
  const redirectLocation = location?.state?.from?.pathname || "/";
  const { userLogin } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // user login
  const onSubmit = (data, e) => {
    setLoginError("");
    // user login
    userLogin(data.email, data.password)
      .then((res) => {
        const loggedUser = res.user;
        // login success alert
        swal({
          title: "Good job!",
          text: "Login Successfull!",
          icon: "success",
          button: "Ok",
        });
        // navigate to home
        navigate(redirectLocation, { replace: true });
      })
      .catch((err) => {
        if (err) {
          setLoginError("Wrong Email or Password. Try again!");
        }
      });
    // reseting form values
    e.target.reset();
  };

  return (
    <>
    <DynamicTitle title={"Login"} />
      <div className="container-fluid pt-5 d-flex justify-content-center align-items-center">
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-6">
              <h3 className="text-center fs-2 pb-3">Login</h3>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    style={{ padding: "0.7rem" }}
                    type="email"
                    placeholder="Enter email"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-danger">Email field is required</span>
                  )}
                </Form.Group>
                <Form.Label>Password</Form.Label>
                <InputGroup className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    style={{ padding: "0.7rem" }}
                    type={show ? "text" : "password"}
                    placeholder="Enter Password"
                    {...register("password", {
                      required: true,
                    })}
                  />
                  <InputGroup.Text onClick={() => setShow(!show)}>
                    {show ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </InputGroup.Text>
                </InputGroup>
                {errors.password && (
                  <span
                    className="text-danger d-block"
                    style={{ marginTop: "-14px" }}
                  >
                    Password field is required
                  </span>
                )}
                {loginError ? (
                  <span
                    className="text-danger d-block"
                    style={{ marginTop: "-14px" }}
                  >
                    {loginError}
                  </span>
                ) : (
                  ""
                )}
                <Button
                  className="w-100 fw-bold text-white mt-2"
                  variant="primary"
                  type="submit"
                  style={{ padding: "0.7rem 0rem" }}
                >
                  Submit
                </Button>
              </Form>
              <div className="text-center pt-3">
                <Link
                  to={"/register"}
                  className="d-text fw-semibold text-decoration-none"
                >
                  New here? Create a new account
                </Link>
                <p className="pt-2">or sign in with</p>
                <div>
                  <SocialLogin />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
