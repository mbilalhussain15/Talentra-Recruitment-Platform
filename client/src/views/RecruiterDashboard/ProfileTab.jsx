import React, { useState, useEffect } from "react";
import "../stlyes/RecDashboard.css";

import { useUpdateRecruiterMutation, useGetRecruiterByIDQuery } from "../../redux/slices/api/recruiterApi.js";
import { useSelector } from "react-redux";



const ProfileTab = () => {


  const { user } = useSelector((state) => state.auth);

  const loggedInUserId = user?.userId 
  const [companyName, setCompanyName] = useState("Default Company Name");
  const [isEditing, setIsEditing] = useState(false);

  const { data: recruiter, isLoading, refetch } = useGetRecruiterByIDQuery(loggedInUserId, {
    skip: !loggedInUserId, 
  });

  const [updateRecruiter] = useUpdateRecruiterMutation();

  useEffect(() => {
    if (recruiter) {
      setCompanyName(recruiter.name); 
    }
  }, [recruiter]);

  const handleUpdate = async () => {
    try {
      
      const userId = loggedInUserId; 
      const data= 
      { 
        name: companyName 
      }
      const response = await updateRecruiter({ userId, data}).unwrap();
     
      console.log("Company name updated:", response);
      alert(`Company name updated to: ${companyName}`);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update company name:", err);
      alert("Failed to update company name. Please try again.");
    }
  };

  return (
    <div className="profile-tab-container p-6 bg-blue-50 rounded-lg shadow-lg">
      <h1 className="profile-header text-3xl font-bold text-blue-600 mb-4">Your Company Profile</h1>

      <div className="form-group mb-4">
        <label className="block text-gray-700 font-medium mb-2">Company Name</label>
        {isEditing ? (
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter Company Name"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        ) : (
          <p className="text-xl text-blue-600">{companyName}</p>
        )}
      </div>

      {isEditing ? (
        <button onClick={handleUpdate} className="save-button w-full bg-blue-600 text-white py-3 rounded-lg font-medium flex items-center justify-center">
          Update Company Name
        </button>
      ) : (
        <button onClick={() => setIsEditing(true)} className="edit-button w-full bg-blue-600 text-white py-3 rounded-lg font-medium flex items-center justify-center">
          Edit Company Name
        </button>
      )}
    </div>
  );
};

export default ProfileTab;
