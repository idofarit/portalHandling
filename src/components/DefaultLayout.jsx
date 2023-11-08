import React from "react";
import { FaUserCircle } from "react-icons/fa";

const DefaultLayout = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="layout">
      <div className="sidebar justify-content-between ">sidebar</div>
      <div className="content">
        <div className="header justify-content-between d-flex">
          <span className="logo">TRUjOB</span>
          <div className="d-flex gap-1 align-items-center">
            <FaUserCircle />
            <span>{user?.name}</span>
          </div>
        </div>
        <div className="body">{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
