import React, { useState } from "react";
import "../stlyes/AuthPages.css"; // Updated to use AuthPages.css
import { useForgotPasswordMutation } from "../../redux/slices/api/authApi.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [forgotPassword] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email address.");
      return;
    }
    
    try {
      const response = await forgotPassword({ email }).unwrap();
      setMessage(response.message); 
    } catch (error) {
      console.error(error);
      setMessage(error.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="auth-container">
      {/* Left Side: Form */}
      <div className="auth-form-container">
        <div className="auth-logo">
          <h1>Talentra</h1>
        </div>
        <div className="auth-form">
          <h2>Forgot Password</h2>
          <p>Enter your email to receive a password reset link.</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
