import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGithub, FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // redirect location
  const redirectLocation = location?.state?.from?.pathname || "/";
  const { googleSignIn } = useContext(AuthContext);
  // google sign in
  const provider = new GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    googleSignIn(provider)
      .then((res) => {
        const goggleUser = res.user;
        const savedUser = {
          name: goggleUser?.displayName,
          email: goggleUser?.email,
        };
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
                text: "Login Successfull!",
                icon: "success",
                button: "Ok",
              });
              // navigate to home
              navigate(redirectLocation, { replace: true });
            }
          });
        // navigate to home
        navigate(redirectLocation, { replace: true });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Link className="pe-3 fs-4" onClick={handleGoogleSignIn}>
        <FaGoogle />
      </Link>
      <Link className="fs-4">
        <FaGithub />
      </Link>
    </div>
  );
};

export default SocialLogin;
