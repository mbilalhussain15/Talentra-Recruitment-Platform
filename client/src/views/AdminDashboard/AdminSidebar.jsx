import React from "react";
import { NavLink } from "react-router-dom";
import { BsStack } from "react-icons/bs";
import { IoBriefcaseOutline } from "react-icons/io5";
import { MdAddCircleOutline } from "react-icons/md";
import { CiSaveDown2 } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { PiNotebook } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";

const AdminSidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-[#FFFFFF] shadow-md flex flex-col justify-between py-6 sidebar">
      <div>
        <h1 className="text-xs font-medium text-[#9199A3] uppercase pb-5 pl-4">
          Admin Dashboard
        </h1>
        <ul className="space-y-4">
          <li >
            <NavLink
            
              to="/admin/dashboard/listalljobs"
              className={({ isActive }) =>
                `flex items-center space-x-4 px-5 py-2 transition  text-sm ${
                  isActive ? "bg-[#E7F0FA] text-[#0A65CC] custom-boxshadow" : "text-[#767F8C] hover:bg-blue-50"
                }`
              }
            >
              <BsStack  className="w-6 h-6"/>
              <span>List All Jobs</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/dashboard/listallusers"
              className={({ isActive }) =>
                `flex items-center space-x-4 px-5 py-2 transition  text-sm ${
                  isActive ? "bg-[#E7F0FA] text-[#0A65CC] custom-boxshadow" : " text-[#767F8C] hover:bg-blue-50"
                }`
              }
            >
              <MdAddCircleOutline  className="w-6 h-6" />
              <span>List All Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/dashboard/admin-accounts"
              className={({ isActive }) =>
                `flex items-center space-x-4 px-5 py-2 transition  text-sm ${
                  isActive ? "bg-[#E7F0FA] text-[#0A65CC] custom-boxshadow" : "text-[#767F8C]  hover:bg-blue-50"
                }`
              }
            >
              <IoBriefcaseOutline  className="w-6 h-6"/>
              <span>Admin Accounts</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/dashboard/profile"
              className={({ isActive }) =>
                `flex items-center space-x-4 px-5 py-2 transition  text-sm ${
                  isActive ? "bg-[#E7F0FA] text-[#0A65CC] custom-boxshadow" : "text-[#767F8C]  hover:bg-blue-50"
                }`
              }
            >
              <IoBriefcaseOutline  className="w-6 h-6"/>
              <span>Profile</span>
            </NavLink>
          </li>
        </ul>
      </div>
      {/* Logout Button */}
      <button className="flex items-center font-medium text-sm space-x-3  px-6 py-2 text-[#767F8C] hover:bg-[#E7F0FA] transition">
      <LuLogOut  className='w-6 h-6'/>
        <span>Log-out</span>
      </button>
    </aside>
  );
};

export default AdminSidebar;