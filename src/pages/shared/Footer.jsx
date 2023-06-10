import React from "react";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="mt-5 container-fluid bg-dark pt-5 pb-3 text-white">
        <div className="container py-5">
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="pb-3">
                <h2 className="fw-bold fs-1">Fluency Fusion</h2>
                {/* <img
                  src={logo}
                  className="img-fluid"
                  style={{ width: "13rem" }}
                  alt=""
                /> */}
              </div>
              <p>We are a Bangladesh based English Learning Platform.</p>
              <p>
                <span className="d-block">
                  Middle Badda, Dhaka 1212, Bangladesh
                </span>
                <span className="d-block">Phone: +098988998 98</span>
                <span className="d-block">Email: info@fluency-fusion.com</span>
              </p>
            </div>
            <div className="col-md-6 col-lg-2">
              <h5 className="pb-4">Our Services</h5>
              <p>
                <a className="text-decoration-none text-white" href="">
                  Best Courses
                </a>
              </p>
              <p>
                <a className="text-decoration-none text-white" href="">
                  Premium Courses
                </a>
              </p>
              <p>
                <a className="text-decoration-none text-white" href="">
                  Free Courses
                </a>
              </p>
              <p>
                <a className="text-decoration-none text-white" href="">
                  English Courses
                </a>
              </p>
            </div>
            <div className="col-md-6 col-lg-2">
              <h5 className="pb-4">Important Links</h5>
              <p>
                <a className="text-decoration-none text-white" href="#">
                  About us
                </a>
              </p>
              <p>
                <a className="text-decoration-none text-white" href="#">
                  Meet the team
                </a>
              </p>
              <p>
                <a className="text-decoration-none text-white" href="#">
                  Partner
                </a>
              </p>
              <p>
                <a className="text-decoration-none text-white" href="#">
                  Pricing Plan
                </a>
              </p>
              <p>
                <a className="text-decoration-none text-white" href="#">
                  Career
                </a>
              </p>
            </div>
            <div className="col-md-6 col-lg-4">
              <h5 className="pb-4">Join Our Newsletter</h5>
              <p>Get Updates Always</p>
              <div className="input-group my-3">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Enter your email"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                <button
                  className="btn btn-primary fw-semibold"
                  type="button"
                  id="button-addon2"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="container d-flex justify-content-end">
          <p className="fs-4">
            <Link className="text-white" to={"https://instagram.com/"}>
              <FaInstagram />
            </Link>
          </p>
          <p className="px-3 fs-4">
            <Link className="text-white" to={"https://github.com/"}>
              <FaGithub />
            </Link>
          </p>
          <p className="fs-4">
            <Link
              className="text-white"
              to={"https://web.facebook.com/?_rdc=1&_rdr"}
            >
              <FaFacebook />
            </Link>
          </p>
        </div>
        <p className="text-center fw-light pt-4">
          All rights reserved | &copy; 2023 Fluency-Fusion
        </p>
      </footer>
    </>
  );
};

export default Footer;
