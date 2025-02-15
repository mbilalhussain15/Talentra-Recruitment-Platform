import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowForward } from "react-icons/io";
import { FaRegCircleCheck } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { GoPeople } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { MdAddCircleOutline } from "react-icons/md";
import Pagination from './components/Pagination.jsx';
import { useGetAllRecJobsQuery } from "../../redux/slices/api/recruiterApi.js";
import { useNavigate } from "react-router-dom";

const ViewAllJobs = () => {
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [viewApplicationsJobId, setViewApplicationsJobId] = useState(null);
  const navigate = useNavigate();
  
  const { data: { jobCount, jobs: getAllRecJobs = [] } = {}, isLoading, isError, error } = useGetAllRecJobsQuery();

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

  return (
    <div className="bg-white mb-10 p-6">
      <div className="bg-white rounded-lg">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-md font-medium text-[#18191C]">My Jobs({jobCount})</h2>
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
            </tr>
          </thead>
          <tbody>
            {getAllRecJobs.map((job, idx) => (
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

export default ViewAllJobs;
