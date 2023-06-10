import React from "react";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const NavigationBar = () => {
  // const { user, logOut } = useContext(AuthContext);
  // const [cart] = useCart();

  // // sign out
  // const handleSignOut = () => {
  //   logOut()
  //     .then(() => {})
  //     .catch((err) => console.log(err));
  // };

  return (
    <>
      <Navbar className="py-3 fixed-top bg-dark" expand="lg">
        <Container>
          <Link
            to={"/"}
            className="fw-bold fs-3 text-white text-decoration-none"
          >
            Fluency Fusion
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="mx-auto my-2 my-lg-0" navbarScroll>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive
                    ? "active nav-link fw-bold px-3"
                    : "nav-link text-white px-3"
                }
              >
                Home
              </NavLink>
              <NavLink
                to={"/instructors"}
                className={({ isActive }) =>
                  isActive
                    ? "active nav-link fw-bold px-3"
                    : "nav-link text-white px-3"
                }
              >
                Instructors
              </NavLink>
              <NavLink
                to={"/classes"}
                className={({ isActive }) =>
                  isActive
                    ? "active nav-link fw-bold px-3"
                    : "nav-link text-white px-3"
                }
              >
                Classes
              </NavLink>
              <NavLink
                to={"dashboard"}
                className={({ isActive }) =>
                  isActive
                    ? "active nav-link fw-bold px-3"
                    : "nav-link text-white px-3"
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to={"/dashboard/mycart"}
                className="nav-link text-white px-3"
              >
                <p>
                  <FaShoppingCart /> <Badge bg="warning">+{0}</Badge>
                </p>
              </NavLink>
            </Nav>
            {/* <div className="d-flex">
              {user &&
                (user?.photoURL ? (
                  <img
                    className="rounded-circle me-2"
                    src={user?.photoURL}
                    style={{
                      height: "2.4rem",
                      width: "2.4rem",
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
            </div> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
