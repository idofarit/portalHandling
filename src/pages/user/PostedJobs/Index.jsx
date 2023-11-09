import React from "react";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";

const PostedJobs = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="d-flex justify-content-between">
        <PageTitle title="Posted Jobs" />
        <button
          onClick={() => navigate("/postedJobs/new")}
          className="primary-outlined-btn"
        >
          NEW JOB
        </button>
      </div>
    </>
  );
};

export default PostedJobs;
