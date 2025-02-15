import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutTab = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/");
  };

  return (
    <div>
      <h1>Logout</h1>
      <button
        onClick={handleLogout}
        className="px-5 py-3 rounded-sm text-sm text-[#5E6670] bg-white border border-[#E4E5E8] hover:border-[#0A65CC] focus:border-[#0A65CC] focus:outline-none"
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutTab;
