import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Instructor from "../pages/Instructor/Instructor";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layouts/Dashboard";
import SelectedClass from "../pages/Dashboard/SelectedClass";
import ManageUser from "../pages/Dashboard/ManageUser";
import AllCourse from "../pages/AllCourse/AllCourse";
import AddCourse from "../pages/Dashboard/AddCourse";
import InstructorsCourse from "../pages/Dashboard/InstructorsCourse";
import ManageCourse from "../pages/Dashboard/ManageCourse";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";

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
        element: <AllCourse />,
        loader: () => fetch("http://localhost:5000/courses"),
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
        element: (
          <AdminRoute>
            <ManageUser />
          </AdminRoute>
        ),
      },
      {
        path: "manageCourses",
        element: (
          <AdminRoute>
            <ManageCourse />
          </AdminRoute>
        ),
      },
      {
        path: "AddCourse",
        element: (
          <InstructorRoute>
            <AddCourse />
          </InstructorRoute>
        ),
      },
      {
        path: "instructorsCourse",
        element: (
          <InstructorRoute>
            <InstructorsCourse />
          </InstructorRoute>
        ),
      },
      {
        path: "selectedClass",
        element: <SelectedClass />,
      },
    ],
  },
]);

export default router;
