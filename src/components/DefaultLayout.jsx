import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, Showloading } from "../redux/AlertSlice";
import { IoMdNotificationsOutline } from "react-icons/io";
import { getUserNotifications, getUserProfile } from "../apis/User";
import { SetReloadNotifications } from "../redux/NotificationSlice";
import { Badge } from "antd";

const DefaultLayout = ({ children }) => {
  const { reloadNotifications, unreadNotifications } = useSelector(
    (state) => state.notifications
  );
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [menuToRender, setMenuToRender] = useState([]);
  const userMenu = [
    {
      title: "Home",
      key: "home",
      onclick: () => navigate("/"),
      icon: <FaHome />,
      path: "/",
    },
    {
      title: "Applied Jobs",
      key: "appliedJobs",
      onclick: () => navigate("/appliedJobs"),
      icon: <FaList />,
      path: "/appliedJobs",
    },
    {
      title: "Posted Jobs",
      key: "postedJobs",
      onclick: () => navigate("/postedJobs"),
      icon: <FaFile />,
      path: "/postedJobs",
    },
    {
      title: "Profile",
      key: "profile",
      onclick: () => navigate(`/profile/${user.id}`),
      icon: <FaUserCog />,
      path: "/profile",
    },
    {
      title: "LogOut",
      key: "logout",
      onclick: () => {
        localStorage.removeItem("user");
        navigate("/login");
      },
      icon: <FaUserMinus />,
      path: "/logout",
    },
  ];

  const adminMenu = [
    {
      title: "Home",
      key: "home",
      onclick: () => navigate("/"),
      icon: <FaHome />,
      path: "/",
    },
    {
      title: "Applications",
      key: "applications",
      onclick: () => navigate("/admin/applications"),
      icon: <FaList />,
      path: "/admin/applications",
    },
    {
      title: "Jobs",
      key: "jobs",
      onclick: () => navigate("/admin/jobs"),
      icon: <FaFile />,
      path: "/admin/jobs",
    },
    {
      title: "Users",
      key: "users",
      onclick: () => navigate("/admin/users"),
      icon: <FaUserCog />,
      path: "/admin/users",
    },
    {
      title: "LogOut",
      key: "logout",
      onclick: () => {
        JSON.parse(localStorage.removeItem("user"));
        navigate("/login");
      },
      icon: <FaUserMinus />,
      path: "/logout",
    },
  ];

  const getData = async () => {
    try {
      dispatch(Showloading());
      const userId = JSON.parse(localStorage.getItem("user")).id;
      const response = await getUserProfile(userId);
      dispatch(HideLoading());
      if (response.data?.isAdmin === true) {
        setMenuToRender(adminMenu);
      } else {
        setMenuToRender(userMenu);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadNotifications = async () => {
    try {
      dispatch(Showloading());
      await getUserNotifications();
      dispatch(HideLoading());
      dispatch(SetReloadNotifications(false));
    } catch (error) {
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (reloadNotifications) {
      loadNotifications();
    }
  }, [reloadNotifications]);
  return (
    <div className="layout">
      <div className="sidebar justify-content-between ">
        <div
          className="menu"
          style={{
            width: collapsed ? "38px" : "135px",
            transition: "all 0.3s ease-in",
          }}
        >
          {menuToRender.map((item, index) => {
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
            <Badge
              count={unreadNotifications?.length || 0}
              className="mx-3"
              onClick={() => navigate("/notifications")}
            >
              <IoMdNotificationsOutline className="notify" />
            </Badge>

            <span>{user?.name}</span>
            <FaUserCircle />
          </div>
        </div>
        <div className="body">{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
