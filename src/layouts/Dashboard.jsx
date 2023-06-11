import React, { useContext } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../providers/AuthProvider";
import { FaBook, FaBookmark, FaHome, FaUsers, FaWallet } from "react-icons/fa";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const isAdmin = true;
  const isInstructor = false;
  return (
    <div className="container-fluid">
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
                <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* navbar ends */}
      <div className="row">
        <div
          className="col-lg-3 bg-white shadow-lg"
          style={{ minHeight: "88vh" }}
        >
          <div className="d-flex flex-column flex-shrink-0 text-white pt-5">
            {/* admin items */}
            {isAdmin ? (
              <ul className="nav flex-column mb-auto">
                <li className="nav-item py-1">
                  <NavLink
                    to={"/dashboard/manageClasses"}
                    className={({ isActive }) =>
                      isActive
                        ? "active nav-link fw-bold"
                        : "nav-link text-dark"
                    }
                  >
                    <FaHome className="me-2" />
                    Manage Classes
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
                        to={"/dashboard/addClass"}
                        className={({ isActive }) =>
                          isActive
                            ? "active nav-link fw-bold"
                            : "nav-link text-dark"
                        }
                      >
                        <FaHome className="me-2" />
                        Add Class
                      </NavLink>
                    </li>
                    <li className="nav-item py-1">
                      <NavLink
                        to={"/dashboard/instructorClasses"}
                        className={({ isActive }) =>
                          isActive
                            ? "active nav-link fw-bold"
                            : "nav-link text-dark"
                        }
                      >
                        <FaBook className="me-2" />
                        My Classes
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
                        to={"/dashboard/selectedClass"}
                        className={({ isActive }) =>
                          isActive
                            ? "active nav-link fw-bold"
                            : "nav-link text-dark"
                        }
                      >
                        <FaBook className="me-2" />
                        My Selected Classes
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
                        My Enrolled Classes
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
        <div className="col-lg-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
