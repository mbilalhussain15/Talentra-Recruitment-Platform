import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutTab = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    console.log("User logged out");
    navigate("/");
  };

  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutTab;
