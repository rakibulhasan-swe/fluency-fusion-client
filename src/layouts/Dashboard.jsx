import React, { useContext } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../providers/AuthProvider";
import { FaBook, FaBookmark, FaHome } from "react-icons/fa";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
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
          <Navbar.Brand href="#home">
            <img
              className="img-fluid"
              style={{ height: "3rem" }}
              src={logo}
              alt=""
            />
          </Navbar.Brand>
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
          <div class="d-flex flex-column flex-shrink-0 p-3 text-white">
            <ul class="nav flex-column mb-auto">
              <li class="nav-item">
                <NavLink
                  to={"/dashboard/home"}
                  className={({ isActive }) =>
                    isActive ? "active nav-link fw-bold" : "nav-link text-dark"
                  }
                >
                  <FaHome className="me-2" />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/selectedClass"}
                  className={({ isActive }) =>
                    isActive ? "active nav-link fw-bold" : "nav-link text-dark"
                  }
                >
                  <FaBook className="me-2" />
                  My Selected Classes
                </NavLink>
              </li>
              <li>
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
            </ul>
            <hr />
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
