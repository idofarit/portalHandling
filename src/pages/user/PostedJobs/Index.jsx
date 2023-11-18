import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoading, Showloading } from "../../../redux/AlertSlice";

import { Button, Table, message } from "antd";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import AppliedCandidates from "./AppliedCandidates";
import {
  deleteJobById,
  getApplicationByJobId,
  getPostedJobByUserId,
} from "../../../apis/Jobs";

const PostedJobs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [showAppliedCandidates, setShowAppliedCandidates] = useState(false);
  const [appliedCandidates, setAppliedCandidates] = useState([]);

  const getData = async () => {
    try {
      dispatch(Showloading());
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await getPostedJobByUserId(user.id);
      if (response.success) {
        setData(response.data);
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

  const getAppliedCandidates = async (id) => {
    try {
      dispatch(Showloading());
      const response = await getApplicationByJobId(id);
      if (response.success) {
        setAppliedCandidates(response.data);
        setShowAppliedCandidates(true);
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
          <Button
            type="primary"
            onClick={() => getAppliedCandidates(record.id)}
          >
            Candidates
          </Button>
          <AiFillDelete cursor="pointer" onClick={() => deleteJob(record.id)} />
          <AiFillEdit
            cursor="pointer"
            onClick={() => navigate(`/postedJobs/edit/${record.id}`)}
          />
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
        <PageTitle title="Posted Jobs" />
        <button
          onClick={() => navigate("/postedJobs/new")}
          className="primary-outlined-btn"
        >
          NEW JOB
        </button>
      </div>

      <Table columns={columns} dataSource={data} />

      {showAppliedCandidates && (
        <AppliedCandidates
          showAppliedCandidates={showAppliedCandidates}
          setShowAppliedCandidates={setShowAppliedCandidates}
          appliedCandidates={appliedCandidates}
          reloadData={getAppliedCandidates}
        />
      )}
    </>
  );
};

export default PostedJobs;
