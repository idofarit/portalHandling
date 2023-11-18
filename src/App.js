import React from "react";
import "./stylesheets/customComponent.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./stylesheets/layout.css";
import HomeLayout from "./pages/HomeLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";
import AppliedJobs from "./pages/user/AppliedJobs";
import Profile from "./pages/user/Profile/Index";
import PostedJobs from "./pages/user/PostedJobs/Index";
import NewEditJobs from "./pages/user/PostedJobs/NewEditJobs";
import AllJobs from "./pages/admin/AllJobs";
import AllUser from "./pages/admin/AllUser";
import JobDescription from "./pages/JobDescription";
import NotificationPage from "./pages/NotificationPage";

const App = () => {
  const { loading } = useSelector((state) => state.alert);
  return (
    <div>
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomeLayout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobDescription/:id"
            element={
              <ProtectedRoute>
                <JobDescription />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appliedJobs"
            element={
              <ProtectedRoute>
                <AppliedJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/postedJobs"
            element={
              <ProtectedRoute>
                <PostedJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/postedJobs/new"
            element={
              <ProtectedRoute>
                <NewEditJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/postedJobs/edit/:id"
            element={
              <ProtectedRoute>
                <NewEditJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <NotificationPage />
              </ProtectedRoute>
            }
          />

          {/* admin routes */}

          <Route
            path="/admin/jobs"
            element={
              <ProtectedRoute>
                <AllJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <AllUser />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
