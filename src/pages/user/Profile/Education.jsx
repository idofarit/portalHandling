import React from "react";
import { FaTrashAlt } from "react-icons/fa";

import { Button, Col, Form, Input, Row, Space } from "antd";

const Education = () => {
  return (
    <div>
      {/* education */}
      <Form.List name="education">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row align="middle" key={key} gutter={[10, 10]}>
                <Col span={8}>
                  <Form.Item
                    {...restField}
                    name={[name, "degree"]}
                    label="Degree"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <input type="text" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    {...restField}
                    name={[name, "institution"]}
                    label="Institution"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <input type="text" />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    {...restField}
                    name={[name, "percentage"]}
                    label="Percentage"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <input type="number" />
                  </Form.Item>
                </Col>

                <FaTrashAlt
                  style={{
                    cursor: "pointer",
                    margin: "5px",
                  }}
                  onClick={() => remove(name)}
                >
                  Remove
                </FaTrashAlt>
              </Row>
            ))}
            <Form.Item>
              <button onClick={() => add()} className="primary-outlined-btn">
                ADD EDUCATION
              </button>
            </Form.Item>
          </>
        )}
      </Form.List>

      {/* skills */}
      <Form.List name="skills">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row align="middle" key={key} gutter={[10, 10]}>
                <Col span={8}>
                  <Form.Item
                    {...restField}
                    name={[name, "technology"]}
                    label="Technology"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <input type="text" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    {...restField}
                    name={[name, "rating"]}
                    label="Rating"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <input type="text" />
                  </Form.Item>
                </Col>

                <FaTrashAlt
                  style={{
                    cursor: "pointer",
                    margin: "5px",
                  }}
                  onClick={() => remove(name)}
                />
              </Row>
            ))}
            <Form.Item>
              <button onClick={() => add()} className="primary-outlined-btn">
                ADD SKILLS
              </button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};

export default Education;
