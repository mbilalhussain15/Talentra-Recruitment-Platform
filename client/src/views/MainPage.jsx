import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMainViewModel } from "../viewmodels/mainViewModel";
import BackgroundImage from "../assets/MainPageImage.jpg";
import "./MainPage.css";

const MainPage = () => {
  const { handleLogin, handleSignup } = useMainViewModel();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "applicant",
  });
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const response = await handleLogin(formData.email, formData.password);
      if (response.success) {
        navigate(response.role === "applicant" ? "/applicant/home" : "/recruiter/dashboard");
      } else {
        alert("Invalid credentials!");
      }
    } else {
      const response = await handleSignup(formData);
      if (response.success) {
        alert("Account created successfully!");
        setIsLogin(true);
      } else {
        alert("Signup failed!");
      }
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
          <h2>{isLogin ? "Sign in" : "Create account."}</h2>
          <p>
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <span onClick={() => setIsLogin(false)}>Create Account</span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span onClick={() => setIsLogin(true)}>Log In</span>
              </>
            )}
          </p>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="auth-input"
                >
                  <option value="applicant">Applicant</option>
                  <option value="recruiter">Recruiter</option>
                </select>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="auth-input"
                />
              </>
            )}
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="auth-input"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="auth-input"
            />
            {!isLogin && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                className="auth-input"
              />
            )}
            {isLogin && (
            <div className="remember-forgot">
                <label className="remember-me">
                <input type="checkbox" /> Remember Me
                </label>
                <span>Forgot password</span>
            </div>
            )}
            <button type="submit" className="auth-button">
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>
        </div>
      </div>

      {/* Right Side: Background Image */}
      <div
        className="auth-image-container"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <div className="auth-image-overlay">
          <p>
            Over <strong>753.240</strong> candidates waiting for good employees.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
