import React from "react";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return children;
  } else {
    window.location.href = "/login";
  }
  return <div>ProtectedRoute</div>;
};

export default ProtectedRoute;
