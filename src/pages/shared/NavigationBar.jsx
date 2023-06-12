import React, { useContext, useEffect, useState } from "react";
import { Badge, Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { BsSun, BsMoon } from "react-icons/bs";
import { AuthContext } from "../../providers/AuthProvider";
import logo from "../../assets/logo.png";

const NavigationBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const handleThemeChange = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // sign out
  const handleSignOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar
        className="py-3 sticky-top shadow"
        expand="lg"
        style={{
          backdropFilter: "blur(30px)",
          background: theme === "light" ? "rgb(255,255,255, 0.5" : "rgb(0,0,0, 0.5)",
        }}
      >
        <Container>
          <Link
            to={"/"}
            className="fw-bold fs-3 text-dark text-decoration-none"
          >
            <img
              className="img-fluid"
              style={{ height: "3.5rem" }}
              src={logo}
              alt="Logo"
            />
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="mx-auto my-2 my-lg-0" navbarScroll>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive ? "active nav-link fw-bold px-3" : "nav-link px-3"
                }
              >
                Home
              </NavLink>
              <NavLink
                to={"/instructors"}
                className={({ isActive }) =>
                  isActive ? "active nav-link fw-bold px-3" : "nav-link px-3"
                }
              >
                Instructors
              </NavLink>
              <NavLink
                to={"/courses"}
                className={({ isActive }) =>
                  isActive ? "active nav-link fw-bold px-3" : "nav-link px-3"
                }
              >
                Courses
              </NavLink>
              {user && (
                <NavLink
                  to={"dashboard"}
                  className={({ isActive }) =>
                    isActive ? "active nav-link fw-bold px-3" : "nav-link px-3"
                  }
                >
                  Dashboard
                </NavLink>
              )}
              {/* <NavLink
                to={"/dashboard/mycart"}
                className="nav-link text-dark px-3"
              >
                <>
                  <FaShoppingCart /> <Badge bg="primary">+{0}</Badge>
                </>
              </NavLink> */}
            </Nav>
            <div className="d-flex">
              {user &&
                (user?.photoURL ? (
                  <img
                    className="rounded-circle me-2 img-border"
                    src={user?.photoURL}
                    style={{
                      height: "2.5rem",
                      width: "2.5rem",
                      objectFit: "cover",
                    }}
                    alt=""
                  />
                ) : (
                  <Button className="px-3 me-2 btn-primary">
                    {user?.displayName}
                  </Button>
                ))}
              {user && user?.displayName ? (
                <Button
                  className="px-3"
                  variant="danger"
                  onClick={handleSignOut}
                >
                  SignOut
                </Button>
              ) : (
                <Link to={"/login"} className="btn btn-primary px-3">
                  Login
                </Link>
              )}
              <Button
                className="ms-2 rounded-circle"
                onClick={handleThemeChange}
              >
                {theme == "light" ? <BsMoon /> : <BsSun />}
              </Button>
              {/*  */}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
