import React from "react";
import { FaTrashAlt } from "react-icons/fa";

import { Button, Col, Form, Input, Row, Space } from "antd";

const Experience = () => {
  return (
    <>
      {/* exp form */}
      <Form.List name="experience">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row align="middle" key={key} gutter={[10, 10]}>
                <Col span={8}>
                  <Form.Item
                    {...restField}
                    name={[name, "company"]}
                    label="Company"
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
                <Col span={6}>
                  <Form.Item
                    {...restField}
                    name={[name, "institudesignationtion"]}
                    label="Designation"
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
                    name={[name, "duration"]}
                    label="Duration"
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
                <Col span={4}>
                  <Form.Item
                    {...restField}
                    name={[name, "location"]}
                    label="Location"
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
                >
                  Remove
                </FaTrashAlt>
              </Row>
            ))}
            <Form.Item>
              <button onClick={() => add()} className="primary-outlined-btn">
                ADD EXPERIENCE
              </button>
            </Form.Item>
          </>
        )}
      </Form.List>

      {/* project form */}
      <Form.List name="projects">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row align="middle" key={key} gutter={[10, 10]}>
                <Col span={8}>
                  <Form.Item
                    {...restField}
                    name={[name, "title"]}
                    label="Title"
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
                <Col span={6} style={{ marginTop: "1rem" }}>
                  <Form.Item
                    {...restField}
                    name={[name, "description"]}
                    label="Description"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <textarea type="text" />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    {...restField}
                    name={[name, "duration"]}
                    label="Duration"
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
                ADD PROJECT
              </button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};

export default Experience;
