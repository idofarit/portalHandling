import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle";
import { Form, Tabs, message } from "antd";
import PersonalInfo from "./PersonalInfo";
import Education from "./Education";
import Experience from "./Experience";
import { useDispatch } from "react-redux";
import { HideLoading, Showloading } from "../../../redux/AlertSlice";
import { getUserProfile, updateUserProfile } from "../../apis/User";

const { TabPane } = Tabs;

const Profile = () => {
  const [userData, setuserData] = useState(null);
  const dispatch = useDispatch();
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
      const response = await getUserProfile(user.id);
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

  return (
    <div>
      <PageTitle title="Profile" />
      {userData && (
        <Form layout="vertical" onFinish={onFinish} initialValues={userData}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Personal Info" key="1">
              <PersonalInfo />
            </TabPane>
            <TabPane tab="Education" key="2">
              <Education />
            </TabPane>
            <TabPane tab="Experience" key="3">
              <Experience />
            </TabPane>
          </Tabs>
          <div className="d-flex justify-content-end">
            <button className="primary-outlined-btn">Cancel</button>
            <button type="submit" className="primary-contained-btn">
              Save
            </button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default Profile;
