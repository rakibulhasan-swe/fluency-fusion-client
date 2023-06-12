import React, { useContext } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../providers/AuthProvider";
import { FaBook, FaBookmark, FaHome, FaUsers, FaWallet } from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const navigate = useNavigate();
  // logout
  const signOut = () => {
    logOut()
      .then(() => {
        navigate("/", { replace: true });
      })
      .then((err) => console.log(err));
  };

  return (
    <div className="">
      <Navbar
        className="shadow"
        collapseOnSelect
        expand="lg"
        bg="white"
        variant="white"
      >
        <Container>
          <NavLink to={"/"}>
            <img
              className="img-fluid"
              style={{ height: "3rem" }}
              src={logo}
              alt=""
            />
          </NavLink>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto d-flex justify-content-center align-items-center">
              <Nav.Link>
                <img
                  className="img-fluid rounded-circle"
                  style={{ height: "3rem", width: "3rem", objectFit: "cover" }}
                  src={user?.photoURL}
                />
              </Nav.Link>
              <NavDropdown
                title={user?.displayName}
                id="collasible-nav-dropdown"
              >
                <Link className="nav-link" onClick={signOut}>
                  Logout
                </Link>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* navbar ends */}
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-lg-2 bg-white shadow-lg"
            style={{ minHeight: "88vh" }}
          >
            <div className="d-flex flex-column flex-shrink-0 text-white pt-5">
              {/* admin items */}
              {isAdmin ? (
                <ul className="nav flex-column mb-auto">
                  <li className="nav-item py-1">
                    <NavLink
                      to={"/dashboard/manageCourses"}
                      className={({ isActive }) =>
                        isActive
                          ? "active nav-link fw-bold"
                          : "nav-link text-dark"
                      }
                    >
                      <FaHome className="me-2" />
                      Manage Courses
                    </NavLink>
                  </li>
                  <li className="nav-item py-1">
                    <NavLink
                      to={"/dashboard/manageUsers"}
                      className={({ isActive }) =>
                        isActive
                          ? "active nav-link fw-bold"
                          : "nav-link text-dark"
                      }
                    >
                      <FaUsers className="me-2" />
                      Manage Users
                    </NavLink>
                  </li>
                </ul>
              ) : (
                <>
                  {isInstructor ? (
                    <ul className="nav flex-column mb-auto">
                      <li className="nav-item py-1">
                        <NavLink
                          to={"/dashboard/AddCourse"}
                          className={({ isActive }) =>
                            isActive
                              ? "active nav-link fw-bold"
                              : "nav-link text-dark"
                          }
                        >
                          <FaHome className="me-2" />
                          Add Course
                        </NavLink>
                      </li>
                      <li className="nav-item py-1">
                        <NavLink
                          to={"/dashboard/instructorsCourse"}
                          className={({ isActive }) =>
                            isActive
                              ? "active nav-link fw-bold"
                              : "nav-link text-dark"
                          }
                        >
                          <FaBook className="me-2" />
                          My Courses
                        </NavLink>
                      </li>
                    </ul>
                  ) : (
                    <ul className="nav flex-column mb-auto">
                      <li className="nav-item py-1">
                        <NavLink
                          to={"/dashboard/home"}
                          className={({ isActive }) =>
                            isActive
                              ? "active nav-link fw-bold"
                              : "nav-link text-dark"
                          }
                        >
                          <FaHome className="me-2" />
                          Home
                        </NavLink>
                      </li>
                      <li className="nav-item py-1">
                        <NavLink
                          to={"/dashboard/selectedCourses"}
                          className={({ isActive }) =>
                            isActive
                              ? "active nav-link fw-bold"
                              : "nav-link text-dark"
                          }
                        >
                          <FaBook className="me-2" />
                          My Selected Courses
                        </NavLink>
                      </li>
                      <li className="nav-item py-1">
                        <NavLink
                          to={"/dashboard/enrolledClass"}
                          className={({ isActive }) =>
                            isActive ? "active nav-link" : "nav-link text-dark"
                          }
                        >
                          <FaBookmark className="me-2" />
                          My Enrolled Courses
                        </NavLink>
                      </li>
                      <li className="nav-item py-1">
                        <NavLink
                          to={"/dashboard/paymentHistory"}
                          className={({ isActive }) =>
                            isActive ? "active nav-link" : "nav-link text-dark"
                          }
                        >
                          <FaWallet className="me-2" />
                          Payment History
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="col-lg-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
