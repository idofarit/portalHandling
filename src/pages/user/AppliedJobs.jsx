import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Table, message } from "antd";
import { Showloading, HideLoading } from "../../redux/AlertSlice";
import PageTitle from "../../components/PageTitle";
import { getApplicationByUserId } from "../../apis/Jobs";

const AppliedJobs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState();

  const columns = [
    {
      title: "Job",
      dataIndex: "jobTitle",
      key: "title",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Applied on",
      dataIndex: "appliedOn",
      key: "appliedOn",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const getData = async () => {
    try {
      dispatch(Showloading());
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await getApplicationByUserId(user.id);
      if (response.success) {
        setData(response.data);
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
    <>
      <div className="d-flex justify-content-between">
        <PageTitle title="Applied Jobs" />
        <button
          onClick={() => navigate("/postedJobs/new")}
          className="primary-outlined-btn"
        >
          NEW JOB
        </button>
      </div>

      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default AppliedJobs;
