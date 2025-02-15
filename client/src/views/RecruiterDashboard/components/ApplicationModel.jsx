import React, { useEffect, useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { LuDownload } from "react-icons/lu";
import axios from "axios";
import {
  HiOutlineLocationMarker,
  HiOutlineUser,
  HiOutlineCollection,
  HiOutlineAcademicCap,
} from "react-icons/hi";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { useGetJobApplicationsQuery } from "../../../redux/slices/api/recruiterApi.js";
 
const ApplicationModel = ({ isOpen, onClose, candidate, jobId }) => {
  const [applicationsData, setApplicationsData] = useState([]);
 
  const { data: getJobApplications, error, isLoading, refetch } = useGetJobApplicationsQuery(jobId);
  console.log("Applications:", getJobApplications);
  console.log("Job ID:", jobId);
  console.log("Candidate:", candidate);
 
  useEffect(() => {
    if (getJobApplications) {
      console.log("Job ID:", jobId);
      console.log("Candidate ID:", candidate);
     
      const filteredData = getJobApplications
        .filter(job =>
          job.applicants.some(applicant => applicant.jobId === jobId)
        )
        .flatMap(job => job.applicants)
        .filter(applicant => {
          console.log("Applicant ID:", applicant.userId);
          return applicant.userId === candidate;
        });
     
      console.log("Filtered Data (Matching Candidate ID):", filteredData);
 
      const enrichedApplications = filteredData.map(applicant => {
        const applicantDetails = getJobApplications
          .flatMap(job => job.applicantDetails)
          .find(detail => detail.userId === applicant.userId);
 
        return { ...applicant, ...applicantDetails };
      });
 
      setApplicationsData(enrichedApplications);
    }
  }, [getJobApplications, jobId, candidate]);
 
  const handleViewResumeClick = async () => {
    console.log("Applicant ID:", candidate);
    const userId = candidate;
    try {
        const response = await axios.get(
            `http://localhost:5003/api/applicant/fetchResume/${userId}`,
            {
                responseType: "blob",
            }
        );
 
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
    } catch (error) {
        console.error("Error fetching resume:", error);
        alert("Failed to fetch resume. Please try again.");
    }
};
 
  if (!isOpen || isLoading) return null;
 
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#00000099] z-50">
      <div className="relative w-full max-w-4xl h-[90%] bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        {applicationsData.length > 0 ? (
          applicationsData.map((applicant, idx) => (
            <div key={idx}>
              <div className="flex items-center space-x-4 p-4 bg-white sticky top-0 z-10">
                <div className="w-12 h-12 rounded-full bg-gray-400"></div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-[#18191C]">
                    {applicant?.title || "Applicant Name"}
                  </h2>
                  <p className="text-md text-[#767F8C] font-normal">
                    {applicant?.jobRole || "Job Role"}
                  </p>
                 
                </div>
                <div className="flex space-x-2"></div>
              </div>
 
              <div className="p-6 overflow-y-auto max-h-[calc(100%-70px)]">
                {/* Your Job Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 border-b border-b-[#E4E5E8]">
                    <h2 className="text-lg font-bold text-black mb-4">Your Job Details</h2>
                    <div className="space-y-4 p-4 rounded-lg border border-[#E7F0FA]">
                      <h3 className="text-lg font-medium mb-4 text-[#18191C]">Description</h3>
                      <p className="mt-4 space-y-2 text-md font-normal text-[#5E6670]">
                        {applicant?.description || "No description available."}
                      </p>
                    </div>
                  </div>
 
                  {/* Applicant Details */}
                  <div className="space-y-4 p-4 rounded-lg border border-[#E7F0FA]" key={idx}>
                    <div className="flex items-start">
                      <HiOutlineUser className="w-6 h-6 text-[#0A65CC]" />
                      <div className="ml-4">
                        <p className="text-xs font-normal text-[#767F8C]">NAME</p>
                        <p className="text-[#18191C] font-medium text-sm">
                          {applicant?.name || "Name not provided"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <HiOutlineCollection className="w-6 h-6 text-[#0A65CC]" />
                      <div className="ml-4">
                        <p className="text-xs font-normal text-[#767F8C]">SKILLS</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {Array.isArray(applicant?.skills) && applicant.skills.length > 0 ? (
                            applicant.skills.map((skill, idx) => (
                              <span
                                key={idx}
                                className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full"
                              >
                                {skill}
                              </span>
                            ))
                          ) : (
                            <p className="text-[#18191C] font-medium text-sm">Skills not provided</p>
                          )}
                        </div>
                      </div>
                    </div>
                      <div className="flex items-start">
                      <HiOutlineCollection className="w-6 h-6 text-[#0A65CC]" />
                      <div className="ml-4">
                        <p className="text-xs font-normal text-[#767F8C]">EDUCATION</p>
                        {/* <div className="flex flex-wrap gap-2 mt-1"> */}
                           <p className="text-[#18191C] font-medium text-sm"></p>
                          {Array.isArray(applicant?.education) && applicant.education.length > 0 ? (
                            applicant.education.map((education, idx) => (
                              <span
                                key={idx}
                                className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full"
                              >
                                {education}
                              </span>
                            ))
                          ) : (
                            <p className="text-[#18191C] font-medium text-sm">Education not provided</p>
                          )}
                        {/* </div> */}
                      </div>
                    </div>
                   
                  </div>
                </div>
 
                {/* Responsibilities */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-medium mb-4 text-[#18191C]">Responsibilities</h3>
                    <p className="mt-4 space-y-2 text-md font-normal text-[#5E6670]">
                      {applicant?.responsibilities || "No responsibilities provided."}
                    </p>
                  </div>
                  <div className="flex flex-col gap-8">
                    <div className="p-4 rounded-lg border border-[#E7F0FA]">
                      <p className="text-md font-medium text-[#18191C]">View Resume</p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <IoDocumentTextOutline size={40} color="#E4E5E8" />
                          <div className="flex flex-col">
                            <p className="text-[#767F8C] font-normal text-xs">
                              {applicant?.name || "Applicant Name"}
                            </p>
                            <p className="text-[#18191C] font-medium text-sm">PDF</p>
                          </div>
                        </div>
                        <button
                          className="bg-[#E7F0FA] text-[#0A65CC] rounded-sm p-4 flex items-center justify-center"
                          onClick={() => handleViewResumeClick(applicant.userId)}
                        >
                          <LuDownload size={20} />
                        </button>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border border-[#E7F0FA]">
                      <h2 className="text-lg font-semibold pb-2 border-b border-b-[#E4E5E8] text-gray-700">
                        Contact Information
                      </h2>
                      <div className="space-y-8 mt-4">
                        <div className="flex items-start">
                          <FaMapMarkerAlt className="w-6 h-6 text-[#0A65CC]" />
                          <div className="ml-4">
                            <p className="text-xs font-normal text-[#767F8C]">LOCATION</p>
                            <p className="text-[#18191C] font-medium text-sm">
                              {applicant?.location || "Location not provided"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <FaPhone className="w-6 h-6 text-[#0A65CC]" />
                          <div className="ml-4">
                            <p className="text-xs font-normal text-[#767F8C]">PHONE</p>
                            <p className="text-[#18191C] font-medium text-sm">
                              {applicant?.phone || "Phone not provided"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <FaEnvelope className="w-6 h-6 text-[#0A65CC]" />
                          <div className="ml-4">
                            <p className="text-xs font-normal text-[#767F8C]">EMAIL</p>
                            <p className="text-[#18191C] font-medium text-sm">
                              {applicant?.email || "Email not provided"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No applicant data available.</p>
        )}
 
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 z-20">
          <RxCross2 size={30} color="#333" />
        </button>
      </div>
    </div>
  );
};
 
export default ApplicationModel;