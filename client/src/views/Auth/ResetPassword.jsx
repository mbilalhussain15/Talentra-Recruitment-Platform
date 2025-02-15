import React, { useState, useEffect } from "react";
import "../stlyes/AuthPages.css"; // Updated to use AuthPages.css
import { useNavigate,useLocation  } from "react-router-dom";
import { useValidateTokenMutation, useResetPasswordMutation } from "../../redux/slices/api/authApi.js";


const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isValidToken, setIsValidToken] = useState(false);
  
  const [validateToken] = useValidateTokenMutation();
  const [resetPassword] = useResetPasswordMutation();

  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get("token");

    if (tokenFromUrl) {
      setToken(tokenFromUrl);

      validateToken({ token: tokenFromUrl })
        .unwrap()
        .then(() => {
          setIsValidToken(true);
        })
        .catch((error) => {
          setMessage(error.data?.message || "Invalid or expired token.");
          setIsValidToken(false);
        });
    } else {
      setMessage("Missing token.");
      setIsValidToken(false);
    }
  }, [location, validateToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await resetPassword({ password, token }).unwrap();
      setMessage(response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
      setMessage(error.data?.message || "Something went wrong.");
    }
  };


  if (!isValidToken) {
    return (
      <div className="auth-container max-w-md">
        <div className="auth-form-container">
          <h2>Invalid or Expired Link</h2>
          <p>{message}</p>
          <button onClick={() => navigate("/forgot-password")} className="auth-button">
            Request New Link
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      {/* Left Side: Form */}
      <div className="auth-form-container">
        <div className="auth-logo">
          <h1>Talentra</h1>
        </div>
        <div className="auth-form">
          <h2>Set your new Password</h2>
          <p>Please set a new password below.</p>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="auth-input"
            />
            <button type="submit" className="auth-button">
              Reset Password →
            </button>
          </form>
          {message && <p className="helper-text">{message}</p>}
        </div>
      </div>

      {/* Right Side: Background Image */}
      <div className="auth-image-container">
        <div className="auth-image-overlay">
          <p>
            Over <strong>753,240</strong> candidates waiting for good employees.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
