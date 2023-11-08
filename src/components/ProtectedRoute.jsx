import React from "react";
import DefaultLayout from "./DefaultLayout";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return <DefaultLayout>{children}</DefaultLayout>;
  } else {
    window.location.href = "/login";
  }
  return <div>ProtectedRoute</div>;
};

export default ProtectedRoute;
