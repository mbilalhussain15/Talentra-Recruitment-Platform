import React from "react";
import { NavLink } from "react-router-dom";

const NavbarAdmin = () => {
  return (
    <div className="md:px-5 px-3 bg-[#F1F2F4]">
      <nav className="max-w-7xl mx-auto shadow">
        <div className="flex justify-between items-center mx-auto max-w-7xl">
          <div className="flex items-center md:space-x-6 space-x-3">
            <NavLink
              to="/admin/dashboard"
              className="text-[rgb(10,101,204)] font-medium text-sm navb p-2"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/recruiter/jobs"
              className="text-[#5E6670] hover:text-gray-800 font-normal text-sm"
            >
              Reports
            </NavLink>

          </div>

          <div className="flex items-center space-x-2">
            <img
              src="https://flagcdn.com/us.svg"
              alt="US Flag"
              className="h-5 w-5 rounded"
            />
            <select
              className="bg-transparent text-gray-600 outline-none"
              defaultValue="English"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarAdmin;