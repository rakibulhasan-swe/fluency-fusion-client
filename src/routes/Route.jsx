import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Instructor from "../pages/Instructor/Instructor";
import AllClass from "../pages/AllClass/AllClass";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layouts/Dashboard";
import SelectedClass from "../pages/Dashboard/SelectedClass";
import ManageUser from "../pages/Dashboard/ManageUser";
import AddClass from "../pages/Dashboard/AddClass";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/instructors",
        element: (
          <PrivateRoute>
            <Instructor />
          </PrivateRoute>
        ),
      },
      {
        path: "/classes",
        element: <AllClass />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "manageUsers",
        element: <ManageUser />,
      },
      {
        path: "addClass",
        element: <AddClass />,
      },
      {
        path: "selectedClass",
        element: <SelectedClass />,
      },
    ],
  },
]);

export default router;
