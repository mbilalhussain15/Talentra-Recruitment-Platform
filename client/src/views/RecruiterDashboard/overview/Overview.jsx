import React, { useEffect, useRef, useState } from "react";
import StatCard from "../components/StatCard";
import { PiBriefcaseFill } from "react-icons/pi";
import { FaRegAddressCard } from "react-icons/fa6";
import { IoMdArrowForward } from "react-icons/io";
import { FaRegCircleCheck } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { GoPeople } from "react-icons/go";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoEyeOutline } from "react-icons/io5";
import { useGetTopJobsQuery, useGetAllShortlistedCandidatesQuery, useGetRecruiterByIDQuery } from "../../../redux/slices/api/recruiterApi.js";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import ApplicationModel from "../../RecruiterDashboard/components/ApplicationModel";
import JobApplications from "../../RecruiterDashboard/components/JobApplications";

const candidateData = {
  name: "Esther Howard",
  dob: "14 June, 1996",
  nationality: "Bangladesh",
  gender: "Male",
  experience: "7 Years",
  education: "Master Degree",
  biography: `I’ve been passionate about graphic design and digital art from an early age...`,
  coverLetter: `Dear Sir, I am writing to express my interest in the position...`,
  location: "Beverly Hills, California 90202",
  phone: "+49 1512600014",
  email: "esther.howard@gmail.com"
};

const Overview = () => {
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedPage, setSelectedPage] = useState("overview");

  const { user } = useSelector((state) => state.auth);
  const loggedInUserId = user?.userId;

  const userId = loggedInUserId;
  const jobUserId = loggedInUserId;
  console.log("User ID:", userId);
  const { data: { totalJobs, jobs: topJobs = [] } = {}, error, isLoading } = useGetTopJobsQuery(userId);
  const { data: shortlistedData, error: shortlistedError, isLoading: isShortlistedLoading } = useGetAllShortlistedCandidatesQuery(jobUserId);
  const { data: recruiterData, error: recruiterError, isLoading: isRecruiterLoading } = useGetRecruiterByIDQuery(userId);

  console.log("Shortlisted Data:", shortlistedData);
  console.log("Recruiter Data:", recruiterData);
  console.log("Total Jobs:", totalJobs);
  console.log("Top Jobs:", topJobs);

  const jobsArray = Array.isArray(topJobs) ? topJobs : [topJobs];

  const toggleDropdown = (idx) => {
    setIsOpen(isOpen === idx ? null : idx);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
    navigate("/recruiter/dashboard/jobApplications"); 
  };

  return (
    <Routes>
      <Route
        path="/*" // Updated path
        element={
          <div className="bg-white mb-5 p-6 max-w-7xl mx-auto">
            <div className="mb-6 flex items-start gap-2 flex-col">
              {/* <h1 className="text-lg text-[#18191C] font-medium">Hello, SAP</h1> */}
              <h1 className="text-lg text-[#18191C] font-medium">
                Hello, {recruiterData?.name || "Recruiter"}
              </h1>
              <p className="text-[#767F8C] text-sm font-normal">
                Here is your daily activities and applications
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <StatCard
                color={"#E7F0FA"}
                title={"Open Jobs"}
                value={totalJobs || 0}
                img={<PiBriefcaseFill color="#0A65CC" size={30} />}
              />
              <StatCard
                color={"#FFF6E6"}
                title={"Saved Candidates"}
                // value={"2,517"}
                value={shortlistedData?.applicantCount || 0}
                img={<FaRegAddressCard color="#FFA500" size={30} />}
              />
            </div>

            <div className="bg-white rounded-lg">
              <div className="p-4 flex justify-between items-center">
                <h2 className="text-md font-medium text-[#18191C]">
                  Recently Posted Jobs
                </h2>
                <a
                  href="#"
                  className="text-[#767F8C] flex items-center gap-2 text-md font-medium"
                  onClick={() => navigate("/recruiter/dashboard/my-jobs")} // Updated navigation path
                >
                  View all
                  <IoMdArrowForward />
                </a>
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
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading ? (
                        <tr>
                          <td colSpan="4" className="py-4 px-6 text-center">
                            Loading...
                          </td>
                        </tr>
                      ) : error ? (
                        <tr>
                          <td colSpan="4" className="py-4 px-6 text-center">
                            Error loading jobs. Please try again later.
                          </td>
                        </tr>
                      ) : jobsArray.length > 0 ? (
                        jobsArray.map((job, idx) => (
                          <tr
                            key={idx}
                            onClick={() => setSelected(idx)}
                            className={`${
                              selected === idx
                                ? "rounded-lg tb outline-[#0A65CC] outline"
                                : "border-t border-[#E4E5E8]"
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
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="py-4 px-6 text-center">
                            No jobs available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
            </div>
            <ApplicationModel
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              candidate={candidateData}
            />
          </div>
        }
      >
        <Route path="jobApplications" element={<JobApplications />} />
      </Route>
    </Routes>
  );
};



export default Overview;





