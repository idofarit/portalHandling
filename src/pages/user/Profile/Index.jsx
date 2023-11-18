import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle";
import { Form, Tabs, message } from "antd";
import PersonalInfo from "./PersonalInfo";
import Education from "./Education";
import Experience from "./Experience";
import { useDispatch } from "react-redux";
import { HideLoading, Showloading } from "../../../redux/AlertSlice";
import TabPane from "antd/es/tabs/TabPane";
import { useNavigate, useParams } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../../../apis/User";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setuserData] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const onFinish = async (values) => {
    try {
      dispatch(Showloading());
      const response = await updateUserProfile(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {}
  };

  const getData = async () => {
    try {
      dispatch(Showloading());
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await getUserProfile(params.id);
      dispatch(HideLoading());
      if (response.success) {
        console.log(response.data);
        setuserData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: "Personal Info",
      children: <PersonalInfo />,
    },
    {
      key: "2",
      label: "Education",
      children: <Education />,
    },
    {
      key: "3",
      label: "Experience",
      children: <Experience />,
    },
  ];
  return (
    <div>
      <PageTitle title="Profile" />
      {userData && (
        <Form layout="vertical" onFinish={onFinish} initialValues={userData}>
          <Tabs defaultActiveKey="1" items={items} onChange={onchange} />
          <div className="d-flex justify-content-end gap-2">
            <button
              onClick={() => navigate("/")}
              className="primary-outlined-btn"
            >
              Cancel
            </button>

            {params.id === loggedInUser.id && (
              <button type="submit" className="primary-contained-btn">
                Save
              </button>
            )}
          </div>
        </Form>
      )}
    </div>
  );
};

export default Profile;
