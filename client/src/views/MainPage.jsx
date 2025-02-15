import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMainViewModel } from "../viewmodels/mainViewModel";
import BackgroundImage from "../assets/MainPageImage.jpg";
import "./MainPage.css";
import {
  useLoginUserMutation, 
  useSignupRecruiterMutation,
  useSignupApplicantMutation,
  useSignupAdminMutation 
} from '../redux/slices/api/authApi.js';
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice.js";


const MainPage = () => {
  const { handleLogin, handleSignup } = useMainViewModel();
  const [isLogin, setIsLogin] = useState(true);

  const dispatch= useDispatch();
  const [loginUser] = useLoginUserMutation();
  const [signupRecruiter] = useSignupRecruiterMutation();
  const [signupApplicant] = useSignupApplicantMutation();
  const [signupAdmin] = useSignupAdminMutation(); 
  

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "applicant",
  });
  const navigate = useNavigate(); // Navigation hook

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { email, password, name, role } = formData;  // Destructure the formData
    let response;
  
    const type = role || "applicant"; // Default to "admin" if not provided
  
    if (isLogin) {
      // Login flow
      try {
        const response = await loginUser({ email, password }).unwrap();
       
        console.log("response Token= ",response.token);
        localStorage.setItem("authToken",response.token);
        dispatch(setCredentials(response));
        if (response.role === "recruiter") {
          navigate("/recruiter/dashboard/overview");
        } else if (response.role === "applicant") {
          navigate("/applicant/dashboard/overview");
        } else if (response.role === "admin") {
          navigate("/admin/dashboard/listalljobs");
        }
      } catch (error) {
        const errorMessage = error?.data?.message || "Login failed! Please try again.";
        alert(errorMessage);
      }
    } else {
      // Signup flow
      console.log("email= ",email);
      console.log("password= ",password);
      console.log("name= ",name);
      console.log("role= ",role);
      try {
        const signupData = { email, password, name, type };
  
        if (role === "recruiter") {
          response = await signupRecruiter(signupData).unwrap();
        } else if (role === "applicant") {
          response = await signupApplicant(signupData).unwrap();
        } else if (role === "admin") {
          console.log("signupData= ",signupData);
          response = await signupAdmin(signupData).unwrap();
          console.log("response= ",response);
        }
  
        if (response?.token) {
          alert("Account created successfully!");
          setIsLogin(true); // Switch to login after successful signup
        } else {
          alert("Signup failed!");
        }
      } catch (error) {
        alert(error?.data?.message || "An error occurred during signup.");
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
                  <option value="admin">Admin</option>
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
                <span onClick={() => navigate("/forgot-password")}>Forgot password?</span>
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
