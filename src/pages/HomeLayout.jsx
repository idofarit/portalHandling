import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HideLoading, Showloading } from "../redux/AlertSlice";
import { Col, Row, message } from "antd";
import PageTitle from "../components/PageTitle";
import { getallJobs } from "../apis/Jobs";
import Filters from "../components/Filters";

const HomeLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    industry: "",
    experience: "",
  });

  const getData = async () => {
    try {
      dispatch(Showloading());
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await getallJobs();
      if (response.success) {
        const approvedJobs = response.data.filter(
          (job) => job.status === "approved"
        );
        setData(approvedJobs);
        // getData();
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {/* <PageTitle title="Land Your First Job with Us" /> */}
      <Filters filters={filters} setFilters={setFilters} setData={setData} />
      <Row gutter={16} className="mt-3">
        {data.map((job, index) => {
          return (
            <Col xl={8} sm={12} xs={24} key={index}>
              <div className="job-card">
                <h5 className="uppercase">{job.title}</h5>
                <hr />

                <div className="d-flex flex-column gap-1">
                  <div className="d-flex justify-content-between mt-2">
                    <span>Company</span>
                    <span>{job.company}</span>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <span>Location</span>
                    <span>{job.location}</span>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <span>Salary</span>
                    <span>{job.salary}</span>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <span>Posted On</span>
                    <span>{job.postedOn}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/jobDescription/${job.id}`)}
                  className="primary-outlined-btn w-100 mt-3"
                >
                  Apply Now
                </button>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default HomeLayout;
