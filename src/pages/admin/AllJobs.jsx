import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Table, message } from "antd";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { HideLoading, Showloading } from "../../redux/AlertSlice";
import PageTitle from "../../components/PageTitle";
import {
  changeJobStatusFromAdmin,
  deleteJobById,
  editJobDetails,
  getallJobs,
} from "../../apis/Jobs";

const AllJobs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      dispatch(Showloading());
      const response = await getallJobs();
      if (response.success) {
        setData(response.data);
        getData();
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const deleteJob = async (id) => {
    try {
      dispatch(Showloading());
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await deleteJobById(id);
      if (response.success) {
        setData(response.data);
        getData();
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const changeStatus = async (jobData, status) => {
    try {
      dispatch(Showloading());
      const response = await changeJobStatusFromAdmin({
        ...jobData,
        status,
      });
      if (response.success) {
        setData(response.data);
        getData();
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Posted on",
      dataIndex: "postedOn",
      key: "postedOn",
    },
    {
      title: "Last Date to apply",
      dataIndex: "lastDateToApply",
      key: "lastDateToApply",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <div className="d-flex gap-3 align-items-center">
          <AiFillDelete cursor="pointer" onClick={() => deleteJob(record.id)} />
          {record.status === "approved" && (
            <span
              className="underline"
              onClick={() => changeStatus(record, "rejected")}
            >
              Reject
            </span>
          )}
          {(record.status === "pending" || record.status === "rejected") && (
            <span
              className="underline"
              onClick={() => changeStatus(record, "approved")}
            >
              Approve
            </span>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between">
        <PageTitle title="All Jobs" />
        <button
          onClick={() => navigate("/AllJobs/new")}
          className="primary-outlined-btn"
        >
          NEW JOB
        </button>
      </div>

      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default AllJobs;
