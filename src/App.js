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
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
