import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsStack } from "react-icons/bs";
import { IoBriefcaseOutline } from "react-icons/io5";
import { MdAddCircleOutline } from "react-icons/md";
import { CiSaveDown2 } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { PiNotebook } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";

const RecSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/"); // Navigate to the login page
  };

  return (
    <aside className="w-64 h-screen bg-[#FFFFFF] shadow-md flex flex-col justify-between py-6 sidebar">
      <div>
        <h1 className="text-xs font-medium text-[#9199A3] uppercase pb-5 pl-4">
          Employers Dashboard
        </h1>
        <ul className="space-y-4">
          <li >
            <NavLink
            
              to="/recruiter/dashboard/overview"
              className={({ isActive }) =>
                `flex items-center space-x-4 px-5 py-2 transition  text-sm ${
                  isActive ? "bg-[#E7F0FA] text-[#0A65CC] custom-boxshadow" : "text-[#767F8C] hover:bg-blue-50"
                }`
              }
            >
              <BsStack  className="w-6 h-6"/>
              <span>Overview</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recruiter/dashboard/post-job"
              className={({ isActive }) =>
                `flex items-center space-x-4 px-5 py-2 transition  text-sm ${
                  isActive ? "bg-[#E7F0FA] text-[#0A65CC] custom-boxshadow" : " text-[#767F8C] hover:bg-blue-50"
                }`
              }
            >
              <MdAddCircleOutline  className="w-6 h-6" />
              <span>Post a Job</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recruiter/dashboard/my-jobs"
              className={({ isActive }) =>
                `flex items-center space-x-4 px-5 py-2 transition  text-sm ${
                  isActive ? "bg-[#E7F0FA] text-[#0A65CC] custom-boxshadow" : "text-[#767F8C]  hover:bg-blue-50"
                }`
              }
            >
              <IoBriefcaseOutline  className="w-6 h-6"/>
              <span>My Jobs</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recruiter/dashboard/view-jobs"
              className={({ isActive }) =>
                `flex items-center space-x-4 px-5 py-2 transition  text-sm ${
                  isActive ? "bg-[#E7F0FA] text-[#0A65CC] custom-boxshadow" : "text-[#767F8C]  hover:bg-blue-50"
                }`
              }
            >
              <IoBriefcaseOutline  className="w-6 h-6"/>
              <span>View All Jobs</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recruiter/dashboard/saved-candidates"
              className={({ isActive }) =>
                `flex items-center space-x-4 px-5 py-2 transition  text-sm ${
                  isActive ? "bg-[#E7F0FA] text-[#0A65CC] custom-boxshadow" : "text-[#767F8C] hover:bg-blue-50"
                }`
              }
            >
              <CiSaveDown2  className='w-6 h-6'/>
              <span>Saved Candidates</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recruiter/dashboard/plans-billing"
              className={({ isActive }) =>
                `flex items-center space-x-4 px-5 py-2 transition  text-sm ${
                  isActive ? "bg-[#E7F0FA] text-[#0A65CC] custom-boxshadow" : "text-[#767F8C] hover:bg-blue-50"
                }`
              }
            >
              <PiNotebook  className='w-6 h-6'/>
              <span>Plans & Billing</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recruiter/dashboard/profile"
              className={({ isActive }) =>
                `flex items-center space-x-4 px-5 py-2 transition  text-sm ${
                  isActive ? "bg-[#E7F0FA] text-[#0A65CC] custom-boxshadow" : "text-[#767F8C] hover:bg-blue-50"
                }`
              }
            >
              <CgProfile className='w-6 h-6' />
              <span>Profile</span>
            </NavLink>
          </li>
          <li>
          </li>
        </ul>
      </div>
      {/* Logout Button */}
      <button className="flex items-center font-medium text-sm space-x-3  px-6 py-2 text-[#767F8C] hover:bg-[#E7F0FA] transition" onClick={handleLogout}>
      <LuLogOut  className='w-6 h-6'/>
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default RecSidebar;
