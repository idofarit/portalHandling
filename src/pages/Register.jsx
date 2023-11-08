import React from "react";
import { Form, message } from "antd";
import { Link } from "react-router-dom";
import { RegisterUser } from "./apis/Auth";

const Register = () => {
  const onFinish = async (values) => {
    try {
      const response = await RegisterUser(values);

      if (response.success) {
        message.success(response.message);
        window.location.href = "/login";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <>
      <div className="bg-primary h-screen d-flex justify-content-center align-items-center">
        <div className="bg-white p-4 w-350">
          <h4>TRUEjOb - Register Here</h4>
          <hr />
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item name="name" label="Name">
              <input type="text" />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <input type="email" />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <input type="password" />
            </Form.Item>

            <button
              type="submit"
              className="primary-contained-btn mt-4 d-flex justify-content-center w-100 m-auto align-items-center"
            >
              Register
            </button>
            <div className="d-flex mt-2 justify-content-between">
              <p>Already a member?</p>
              <Link to="/login">SignIn Here</Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
