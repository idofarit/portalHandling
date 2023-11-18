import { Form, message } from "antd";
import { Link } from "react-router-dom";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { HideLoading, Showloading } from "../redux/AlertSlice";
import { LoginUser } from "../apis/Auth";

export const loader = async () => {
  const response = await JSON.parse(localStorage.getItem("user"));
  return { response };
};

const Login = () => {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(Showloading());
      const response = await LoginUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.href = "/";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      console.log(error);
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
