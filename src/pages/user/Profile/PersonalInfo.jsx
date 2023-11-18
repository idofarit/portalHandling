import { Col, Form, Row } from "antd";
import React from "react";

const PersonalInfo = () => {
  return (
    <Row gutter={16}>
      <Col xl={8} sm={12} xs={24}>
        <Form.Item
          label="First Name"
          name="FirstName"
          rules={[{ required: true, message: "required" }]}
        >
          <input type="text" />
        </Form.Item>
      </Col>
      <Col xl={8} sm={12} xs={24}>
        <Form.Item
          label="Last Name"
          name="LastName"
          rules={[{ required: true, message: "required" }]}
        >
          <input type="text" />
        </Form.Item>
      </Col>
      <Col xl={8} sm={12} xs={24}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "required" }]}
        >
          <input type="email" />
        </Form.Item>
      </Col>
      <Col xl={8} sm={12} xs={24}>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[{ required: true, message: "required" }]}
        >
          <input type="number" />
        </Form.Item>
      </Col>
      <Col xl={8} sm={12} xs={24}>
        <Form.Item
          label="Portfolio"
          name="portfolio"
          rules={[{ required: true, message: "required" }]}
        >
          <input type="text" />
        </Form.Item>
      </Col>
      <Col xl={8} sm={12} xs={24}>
        <Form.Item
          label="Career Objective"
          name="careerObjective"
          rules={[{ required: true, message: "required" }]}
        >
          <textarea type="text" rows="4" />
        </Form.Item>
      </Col>
      <Col xl={8} sm={12} xs={24}>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "required" }]}
        >
          <textarea type="text" rows="4" />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default PersonalInfo;
