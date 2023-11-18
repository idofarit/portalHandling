import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { HideLoading, Showloading } from "../redux/AlertSlice";
import { applyJobPost, getApplicationByJobId, getJobById } from "../apis/Jobs";
import { Col, Row, message } from "antd";
import PageTitle from "../components/PageTitle";

const JobDescription = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [jobData, setJobData] = useState(null);
  const [showApplyButton, setShowApplyButton] = useState(true);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const getData = async () => {
    try {
      dispatch(Showloading());
      const response = await getJobById(params.id);
      console.log(response);
      console.log(params);
      if (response.data.postedByUserId === user.id) {
        setShowApplyButton(false);
      }
      const applicationsResponse = await getApplicationByJobId(params.id);
      console.log(applicationsResponse);
      if (
        applicationsResponse.data.filter((item) => item.userId === user.id)
          .length > 0
      ) {
        setShowApplyButton(false);
        setAlreadyApplied(true);
      }
      dispatch(HideLoading());
      if (response.success) {
        setJobData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {}
  };

  const applyNow = async () => {
    try {
      dispatch(Showloading());
      const response = await applyJobPost(jobData);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        navigate("/");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    jobData && (
      <div>
        <PageTitle title={jobData.title} />

        <Row>
          <Col xl={24} xs={24} className=" text-center">
            <div className="d-flex flex-column gap-1 mt-3">
              <div className="  d-flex justify-content-between mt-2">
                <span>Company</span>
                <span>{jobData.company}</span>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span>Location</span>
                <span>{jobData.location.toUpperCase()}</span>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span>Salary</span>
                <span>{jobData.salary}</span>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span>Experience</span>
                <span>{jobData.experience} days</span>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span>Job Type</span>
                <span>{jobData.jobType}</span>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span>Industry</span>
                <span>{jobData.industry.toUpperCase()}</span>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span>Posted On</span>
                <span>{jobData.postedOn}</span>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span>Last Date To Apply</span>
                <span>{jobData.lastDateToApply}</span>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span>Posted By</span>
                <span>{jobData.postedByUserName}</span>
              </div>
            </div>
            <h5 className="mt-3  ">
              Job Description
              <hr />
            </h5>
            <span>{jobData.jobDescription}</span>

            {alreadyApplied ? (
              <div className="already-applied">
                <p>
                  You have already applied for this job! Checkout the Applied
                  Job Section
                </p>
              </div>
            ) : null}

            <div className="mt-2 d-flex justify-content-center align-items-center">
              <button
                onClick={() => navigate("/")}
                className="primary-outlined-btn m-auto mt-3"
              >
                Cancel
              </button>

              {showApplyButton && (
                <button
                  onClick={applyNow}
                  className="primary-contained-btn m-auto"
                >
                  Apply Now
                </button>
              )}
            </div>
          </Col>
        </Row>
      </div>
    )
  );
};

export default JobDescription;
