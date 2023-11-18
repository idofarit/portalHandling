import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { HideLoading, Showloading } from "../redux/AlertSlice";
import { getallJobs } from "../apis/Jobs";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Filters = ({ filters, setFilters, setData }) => {
  const dispatch = useDispatch();

  const filterData = async (filtersTemp) => {
    try {
      dispatch(Showloading());
      const response = await getallJobs(filtersTemp);
      if (response.success) {
        const approvedJobs = response.data.filter(
          (job) => job.status === "approved"
        );
        setData(approvedJobs);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-start gap-2">
        <select
          name=""
          id=""
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        >
          <option value="location">Location</option>
          <option value="india">India</option>
          <option value="usa">USA</option>
          <option value="uk">UK</option>
        </select>
        <select
          name=""
          id=""
          value={filters.industry}
          onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
        >
          <option value="industry">Industry</option>
          <option value="it">IT</option>
          <option value="education">Education</option>
          <option value="interior">Interior</option>
        </select>
        <select
          name=""
          id=""
          value={filters.experience}
          onChange={(e) =>
            setFilters({ ...filters, experience: e.target.value })
          }
        >
          <option value="experience">Experience</option>
          <option value="0">Fresher</option>
          <option value="2">2 Years</option>
          <option value="3">3 Years</option>
        </select>
        <button
          className="primary-contained-btn"
          onClick={() => filterData(filters)}
        >
          Filter
        </button>
        <button
          className="primary-contained-btn"
          onClick={() => {
            filterData({
              location: "",
              industry: "",
              experience: "",
            });
            setFilters({
              location: "",
              industry: "",
              experience: "",
            });
          }}
        >
          clear
        </button>
      </div>
    </div>
  );
};

export default Filters;
