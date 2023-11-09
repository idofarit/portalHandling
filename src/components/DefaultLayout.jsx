import React, { useState } from "react";
import {
  FaUserCircle,
  FaHome,
  FaList,
  FaFile,
  FaUserCog,
  FaUserMinus,
} from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const DefaultLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userMenu = [
    {
      title: "Home",
      onclick: () => navigate("/"),
      icon: <FaHome />,
      path: "/",
    },
    {
      title: "Applied Jobs",
      onclick: () => navigate("/appliedJobs"),
      icon: <FaList />,
      path: "/appliedJobs",
    },
    {
      title: "Posted Jobs",
      onclick: () => navigate("/postedJobs"),
      icon: <FaFile />,
      path: "/postedJobs",
    },
    {
      title: "Profile",
      onclick: () => navigate("/profile"),
      icon: <FaUserCog />,
      path: "/profile",
    },
    {
      title: "LogOut",
      onclick: () => {
        localStorage.removeItem("user");
        navigate("/login");
      },
      icon: <FaUserMinus />,
      path: "/logout",
    },
  ];

  return (
    <div className="layout">
      <div className="sidebar justify-content-between ">
        <div
          className="menu"
          style={{
            width: collapsed ? "38px" : "160px",
            transition: "all 0.3s ease-in",
          }}
        >
          {userMenu.map((item, index) => {
            const isActive = window.location.pathname === item.path;
            return (
              <div
                key={index}
                onClick={item.onclick}
                className={`menu-item ${isActive && `active-menu-item`}`}
              >
                {item.icon}
                {!collapsed && <span className="menu-title">{item.title}</span>}
              </div>
            );
          })}
        </div>
      </div>
      <div className="content">
        <div className="header justify-content-between d-flex">
          <div className="d-flex align-items-center">
            {collapsed && (
              <AiOutlineMenu
                style={{ cursor: "pointer" }}
                onClick={() => setCollapsed(!collapsed)}
              />
            )}
            {!collapsed && (
              <AiOutlineClose
                style={{ cursor: "pointer" }}
                onClick={() => setCollapsed(!collapsed)}
              />
            )}
          </div>
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
