import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="md:px-5 px-3 bg-[#F1F2F4]">
      <nav className="max-w-7xl mx-auto shadow">
        <div className="flex justify-between items-center mx-auto max-w-7xl">
          <div className="flex items-center md:space-x-6 space-x-3">
            <NavLink
              to="/recruiter/dashboard/overview"
              className="text-[rgb(10,101,204)] font-medium text-sm navb p-2"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/recruiter/dashboard/my-jobs"
              className="text-[#5E6670] hover:text-gray-800 font-normal text-sm"
            >
              My Jobs
            </NavLink>
          </div>

          <div className="flex items-center space-x-2">
            <img
              src="https://flagcdn.com/us.svg"
              alt="US Flag"
              className="h-5 w-5 rounded"
            />
            <div className="relative">
              <button
                className="bg-transparent text-gray-600 outline-none flex items-center"
                onClick={toggleDropdown}
              >
                <span>English</span>
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <ul
                className={`absolute ${
                  dropdownOpen ? "block" : "hidden"
                } text-gray-600 pt-1`}
              >
                <li className="">
                  <a
                    className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                    href="#"
                  >
                    English
                  </a>
                </li>
                <li className="">
                  <a
                    className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                    href="#"
                  >
                    Spanish
                  </a>
                </li>
                <li className="">
                  <a
                    className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                    href="#"
                  >
                    French
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;