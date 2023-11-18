import { Modal, Table, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HideLoading, Showloading } from "../../../redux/AlertSlice";
import { changeApplicationStatus } from "../../../apis/Jobs";

const AppliedCandidates = ({
  showAppliedCandidates,
  setShowAppliedCandidates,
  appliedCandidates,
  reloadData,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeStatus = async (applicationsData, status) => {
    try {
      dispatch(Showloading());
      const response = await changeApplicationStatus({
        ...applicationsData,
        status,
      });
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        reloadData(applicationsData.jobId);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error("Something went wrong");
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "userName",
      render: (text, record) => {
        return (
          <span
            className="underline"
            onClick={() => navigate(`/profile/${record.userId}`)}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Applied On",
      dataIndex: "appliedOn",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div>
            {record.status === "pending" && (
              <>
                <span
                  className="underline"
                  onClick={() => changeStatus(record, "approved")}
                >
                  Approved
                </span>
                <span
                  className="underline mx-2"
                  onClick={() => changeStatus(record, "rejected")}
                >
                  Reject
                </span>
              </>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Modal
        title="Applied Candidates"
        open={showAppliedCandidates}
        onCancel={() => setShowAppliedCandidates(!showAppliedCandidates)}
        footer={null}
        width={1000}
      >
        <Table columns={columns} dataSource={appliedCandidates} rowKey="id" />
      </Modal>
    </div>
  );
};

export default AppliedCandidates;
