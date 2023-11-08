import { Form, message } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import { LoginUser } from "./apis/Auth";

const Login = () => {
  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);

      if (response.success) {
        message.success(response.message);
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.href = "/";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <div className="bg-primary h-screen d-flex justify-content-center align-items-center">
      <div className="bg-white p-4 w-350">
        <h4>TRUEjOb - LogIn</h4>
        <hr />
        <Form layout="vertical" onFinish={onFinish}>
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
            LogIn
          </button>
          <div className="d-flex mt-2 justify-content-between">
            <p>Not a member?</p>
            <Link to="/register">Click to register</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
