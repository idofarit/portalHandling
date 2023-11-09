import { Col, Form, Row } from "antd";
import React from "react";

const PersonalInfo = () => {
  return (
    <Row gutter={[10, 10]}>
      <Col span="8">
        <Form.Item label="First Name" name="FirstName">
          <input type="text" />
        </Form.Item>
      </Col>
      <Col span="8">
        <Form.Item label="Last Name" name="LastName">
          <input type="text" />
        </Form.Item>
      </Col>
      <Col span="8">
        <Form.Item label="Email" name="email">
          <input type="email" />
        </Form.Item>
      </Col>
      <Col span="8">
        <Form.Item label="Phone Number" name="phoneNumber">
          <input type="number" />
        </Form.Item>
      </Col>
      <Col span="8">
        <Form.Item label="Portfolio" name="portfolio">
          <input type="text" />
        </Form.Item>
      </Col>
      <Col span="24">
        <Form.Item label="Career Objective" name="careerObjective">
          <textarea type="text" rows="4" />
        </Form.Item>
      </Col>
      <Col span="24">
        <Form.Item label="Address" name="address">
          <textarea type="text" rows="4" />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default PersonalInfo;
