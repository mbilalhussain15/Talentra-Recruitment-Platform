import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const navigate = useNavigate();
  const menuItems = [
    { icon: "/assets/icons/overview.png", label: "Overview", path: "/applicant/dashboard/overview" },
    { icon: "/assets/icons/FindJobs.png", label: "Find Job", path: "/applicant/jobs" },
    { icon: "/assets/icons/applied-jobs.png", label: "Applied Jobs", path: "/applicant/applied-jobs" },
    { icon: "/assets/icons/favourite-jobs.png", label: "Favorite Jobs", path: "/applicant/favorite-jobs" },
    { icon: "/assets/icons/settings.png", label: "Profile", path: "/applicant/profile" },
  ];

  const onLogout = () => {
    // Perform logout logic here (e.g., clearing tokens, etc.)
    navigate('/');
  };

  return (
    <aside className="w-[280px] bg-white border-r border-gray-100">
      <div className="h-[80vh] flex flex-col">
        {/* Header */}
        <div className="px-2 pt-8 pb-4">
          <div className="text-xs font-medium text-gray-500 tracking-wide">
            CANDIDATE DASHBOARD
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-6 py-3.5 gap-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-blue-50 border-l-[3px] border-blue-600 morphed"
                    : "border-l-[3px] border-transparent"
                }`
              }
            >
              <img
                src={item.icon}
                alt={item.label}
                className={`w-5 h-5 ${
                  item.active ? "text-blue-600" : "text-gray-500"
                }`}
              />
              <span
                className={`text-[15px] font-medium ${
                  item.active ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="px-6 py-8 mt-auto">
          <div
            className="cursor-pointer flex items-center gap-3 text-gray-500 hover:text-gray-600 bg-gray-100/50 p-2 rounded-lg"
            onClick={onLogout}
          >
            <img
              src="/assets/icons/logout.png"
              alt="Logout"
              className="w-5 h-5"
            />
            <span className="text-[15px] font-medium">Logout</span>
          </div>
        </div>
      </div>
    </aside>
  );
};