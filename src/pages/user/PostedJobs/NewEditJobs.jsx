import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import { Col, Form, Row, message } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, Showloading } from "../../../redux/AlertSlice";
import { addNewJobPost } from "../../apis/Jobs";

const NewEditJobs = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(Showloading());
      let response = null;
      if (params.id) {
      } else {
        response = await addNewJobPost(values);
      }
      if (response.success) {
        message.success(response.message);
        navigate("/postedJobs");
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <>
      <PageTitle title={params.id ? "EDIT JOB" : "ADD NEW JOB"} />
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={(10, 10)}>
          <Col span={12}>
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "required",
                },
              ]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Industry"
              name="industry"
              rules={[
                {
                  required: true,
                  message: "required",
                },
              ]}
            >
              <select name="" id="">
                <option value="">Select</option>
                <option value="it">IT</option>
                <option value="finance">Finance</option>
                <option value="steel">Steel Industry</option>
                <option value="management">Management</option>
                <option value="service">Service</option>
              </select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Location"
              name="location"
              rules={[
                {
                  required: true,
                  message: "required",
                },
              ]}
            >
              <select name="" id="">
                <option value="">Select</option>
                <option value="india">India</option>
                <option value="us">USA</option>
                <option value="uk">UK</option>
                <option value="canada">Canada</option>
              </select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Company Name"
              name="company"
              rules={[
                {
                  required: true,
                  message: "required",
                },
              ]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Salary"
              name="salary"
              rules={[
                {
                  required: true,
                  message: "required",
                },
              ]}
            >
              <input type="number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Job Type"
              name="jobType"
              rules={[
                {
                  required: true,
                  message: "required",
                },
              ]}
            >
              <select name="" id="">
                <option value="">Select</option>
                <option value="fulltime">Full-Time</option>
                <option value="parttime">Part-Time</option>
                <option value="remote">Remote</option>
              </select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Last Date To Apply"
              name="lastDateToApply"
              rules={[
                {
                  required: true,
                  message: "required",
                },
              ]}
            >
              <input type="date" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Experience"
              name="experience"
              rules={[
                {
                  required: true,
                  message: "required",
                },
              ]}
            >
              <input type="number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Notice Period"
              name="noticePeriod"
              rules={[
                {
                  required: true,
                  message: "required",
                },
              ]}
            >
              <input type="number" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Job Description"
              name="jobDescription"
              rules={[
                {
                  required: true,
                  message: "required",
                },
              ]}
            >
              <textarea type="text" />
            </Form.Item>
          </Col>
        </Row>

        <div className="d-flex justify-content-end gap-2">
          <button
            onClick={() => navigate("/postedJobs")}
            className="primary-outlined-btn"
          >
            Cancel
          </button>
          <button
            onClick={onFinish}
            type="submit"
            className="primary-contained-btn"
          >
            Save
          </button>
        </div>
      </Form>
    </>
  );
};

export default NewEditJobs;
