import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../components/PageTitle";
import { Alert, Tabs, message } from "antd";
import { HideLoading, Showloading } from "../redux/AlertSlice";
import { changeNotification } from "../apis/User";
import { SetReloadNotifications } from "../redux/NotificationSlice";
import { useNavigate } from "react-router-dom";
const { TabPane } = Tabs;

const NotificationPage = () => {
  const dispatch = useDispatch();
  const { readNotifications, unreadNotifications } = useSelector(
    (state) => state.notifications
  );
  const navigate = useNavigate();

  const items = [
    {
      key: "1",
      label: "Unread",
      children: (
        <>
          {unreadNotifications.map((notification, index) => {
            return (
              <Alert
                className="my-2"
                key={index}
                message={
                  <div className="align-items-center d-flex justify-content-between">
                    <div
                      className="d-flex flex-column"
                      onClick={() => navigate(notification.onclick)}
                    >
                      <span>{notification.title}</span>
                      <span>{notification.createdAt}</span>
                    </div>

                    <span
                      className="underline"
                      onClick={() => changeStatus(notification.id, "read")}
                    >
                      Mark as Read
                    </span>
                  </div>
                }
              />
            );
          })}
        </>
      ),
    },
    {
      key: "2",
      label: "Read",
      children: (
        <>
          {readNotifications.map((notification, index) => {
            return (
              <Alert
                className="my-2"
                key={index}
                message={
                  <div className="align-items-center d-flex justify-content-between">
                    <div className="  d-flex flex-column  ">
                      <span>{notification.title}</span>
                      <span>{notification.createdAt}</span>
                    </div>

                    <span className="underline">Mark as Unread</span>
                  </div>
                }
              />
            );
          })}
        </>
      ),
    },
  ];

  const changeStatus = async (id, status) => {
    try {
      dispatch(Showloading());
      const response = await changeNotification(id, status);
      if (response.success) {
        message.success(response.message);
        dispatch(SetReloadNotifications(true));
      }
    } catch (error) {
      dispatch(HideLoading());
      return {
        success: false,
        message: "something went wrong",
      };
    }
  };

  return (
    <div>
      <PageTitle title="Notifications" />
      <Tabs defaultActiveKey="1" items={items}></Tabs>
    </div>
  );
};

export default NotificationPage;
