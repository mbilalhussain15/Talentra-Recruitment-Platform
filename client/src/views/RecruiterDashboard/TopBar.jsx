import React from "react";
import { PiBriefcase } from "react-icons/pi";
import { useNavigate } from "react-router-dom"; 

const TopBar = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/"); 
  };

  return (
    <div className="w-full bg-[#FFFFFF] p-5 border-b border-b-[#E4E5E8] flex items-center justify-between px-10">
      <div className=" flex items-center gap-2">
        <PiBriefcase className="text-[rgb(10,101,204)] w-10 h-10" />
        <p className="text-[#18191C] font-semibold text-2xl">Talentra</p>
      </div>
      <button
        className="border-2 border-[#0A65CC] hover:border-[#0A65CC] focus:border-[#0A65CC] font-semibold text-lg px-3 py-1 text-[#0A65CC] rounded-sm bg-white"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default TopBar;
