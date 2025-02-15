import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowForward } from "react-icons/io";
import { FaRegCircleCheck } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { GoPeople } from "react-icons/go";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoEyeOutline } from "react-icons/io5";
import { jobData } from "../../libs/jobsData.js";
import { IoIosArrowDown } from "react-icons/io";
import { MdAddCircleOutline } from "react-icons/md";
import Pagination from './components/Pagination.jsx';
import { useGetAllJobsQuery, useGetJobApplicationsQuery } from "../../redux/slices/api/recruiterApi.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Filter } from "./components/Filter";

const MyJobsTab = () => {
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const [viewApplicationsJobId, setViewApplicationsJobId] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const loggedInUserId = user?.userId;

  const { data: { jobCount, jobs: getAllJobs = [] } = {}, isLoading, isError, error } = useGetAllJobsQuery(loggedInUserId);
  const { data: jobApplications = [], refetch } = useGetJobApplicationsQuery(selectedJob?.id, {
    skip: !selectedJob, 
  });

  const toggleDropdown = (idx) => {
    setIsOpen(isOpen === idx ? null : idx);
  };

  const options = ["All Jobs", "Active Jobs", "Expired Jobs"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
        setIsOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleViewApplications = (job) => {
    setSelectedJob(job);
    navigate("/recruiter/dashboard/jobApplications", { state: { jobData: job } });
  };

  const filteredJobs = getAllJobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white mb-10 p-6">
      <div className="bg-white rounded-lg">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-md font-medium text-[#18191C]">My Jobs({jobCount})</h2>
          <div className="flex items-center gap-4">
            <Filter searchInput={searchTerm} setSearchInput={setSearchTerm} />
            <div
              className="text-[#767F8C] flex items-center gap-4 text-md font-medium"
              ref={dropdownRef}
            >
              <div className="relative inline-block text-left">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex justify-between items-center w-full px-5 py-3 text-md font-normal text-[#5E6670] bg-white border border-[#E4E5E8] rounded-sm focus:outline-none"
                >
                  All Jobs
                  <IoIosArrowDown
                    className={`w-5 h-5 ml-5 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute left-0 z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                    {options.map((option, idx) => (
                      <button
                        key={idx}
                        className="block w-full px-4 py-2 text-left text-sm text-[#5E6670] hover:bg-[#E7F0FA]"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          console.log(`Selected: ${option}`);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto p-2">
        <table className="w-full text-left text-sm ">
          <thead>
            <tr className=" text-[#474C54] font-normal text-xs rounded-sm bg-[#F1F2F4]">
              <th className="py-3 px-6">Jobs</th>
              <th className="py-3 px-6">Role</th>
              <th className="py-3 px-6">Level</th>
              <th className="py-3 px-6">Experience</th>
              <th className="py-3 px-6">Expiration Date</th>             
              <th className="py-3 px-6">Job Type</th>
              <th className="py-3 px-6">Applicants</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Applications</th>

            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job, idx) => (
              <tr
                onClick={() => setSelected(idx)}
                key={idx}
                className={`${
                  selected === idx
                    ? " rounded-lg tb outline-[#0A65CC] outline"
                    : "border-t  border-[#E4E5E8]"
                } transition duration-200`}
              >
                <td className="py-4 px-6 flex flex-col items-start gap-1 whitespace-nowrap">
                  <p className="font-medium text-[#5E6670] text-md">
                    {job.title}
                  </p>
                 
                </td>

                <td className="py-4 px-6 text-[#5E6670] space-x-2">
                  <div className="flex items-center gap-2">
                
                    <p className="font-normal text-sm">
                      {job.jobRole} 
                    </p>
                  </div>
                </td>
                <td className="py-4 px-6 text-[#5E6670] space-x-2 ">
                  <div className="flex items-center gap-2">
                
                    <p className="font-normal text-sm">
                      {job.jobLevel} 
                    </p>
                  </div>
                </td>
                <td className="py-4 px-6 text-[#5E6670] space-x-2">
                  <div className="flex items-center gap-2">
                
                    <p className="font-normal text-sm">
                      {job.experience} 
                    </p>
                  </div>
                </td>
                <td className="py-4 px-6 text-[#5E6670] space-x-2 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                
                    <p className="font-normal text-sm">
                      {new Date(job.expirationDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>

                  </div>
                </td>
                <td className="py-4 px-6 text-[#5E6670] space-x-2">
                  <div className="flex items-center gap-2">
                
                    <p className="font-normal text-sm">
                      {job.jobType} 
                    </p>
                  </div>
                </td>
                <td className="py-4 px-6 text-[#5E6670] space-x-2">
                  <div className="flex items-center gap-2">
                    
                    <p className="font-normal text-sm">
                      {job.applicantCount || 0} 
                    </p>
                  </div>
                </td>
                <td className="py-4 px-6 gap-2">
                  <span
                    className={`text-sm flex items-center gap-2 font-medium ${
                      job.status === "Active"
                        ? "text-[#0BA02C]"
                        : "text-[#E05151]"
                    }`}
                  >
                    {job.status === "Active" ? (
                      <FaRegCircleCheck size={20} color="#0BA02C" />
                    ) : (
                      <RxCrossCircled size={20} color="#E05151" />
                    )}
                    {job.status}
                  </span>
                </td>
                
                <td className="py-4 px-6 relative whitespace-nowrap">
                  <div className="text-md flex items-center gap-5 ">
                    <button
                      className="cursor-pointer font-semibold p-2 rounded-sm text-[#0A65CC] bg-[#F1F2F4]"
                      onClick={() => handleViewApplications(job)}
                    >
                      View Applications
                    </button>
                    <div
                      onClick={() => toggleDropdown(idx)}
                      className={`${
                        selected === idx ? "p-2 bg-[#F1F2F4] rounded-sm" : ""
                      } cursor-pointer`}
                    >
                      <HiOutlineDotsVertical
                        size={20}
                        color={`${selected === idx ? "black" : "#767F8C"}`}
                      />
                    </div>
                  </div>

                  {isOpen === idx && (
                    <div
                      className="absolute z-10 bg-[#FFFFFF] left-16 flex text-[#5E6670] font-medium text-sm items-start flex-col border border-[#E9EAED] rounded-md py-2 shadow-md"
                      style={{
                        top: "90%",
                        minWidth: "150px",
                      }}
                    >
                      <button className="flex p-2 cursor-pointer w-full items-center gap-2 hover:bg-[#E7F0FA] rounded-md">
                        <MdAddCircleOutline />
                        Promote Job
                      </button>
                      <button className="flex p-2 cursor-pointer w-full items-center gap-2 hover:bg-[#E7F0FA] rounded-md">
                        <IoEyeOutline />
                        View Details
                      </button>
                      <button className="flex p-2 cursor-pointer w-full items-center gap-2 hover:bg-[#E7F0FA] rounded-md">
                        <RxCrossCircled />
                        Mark as expired
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
       
       <Pagination totalPages={5} />
    </div>
  );
};

export default MyJobsTab;
