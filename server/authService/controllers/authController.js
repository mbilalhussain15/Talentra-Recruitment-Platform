import bcrypt from "bcryptjs";
import { generateJWTWithPrivateKey } from "../utils/jwtGenerator.js";
import UserAuth from "../models/userAuthModel.js";
import Admin from "../models/adminModel.js";
import axios from "axios";
import jwt from "jsonwebtoken";
import { sendPasswordResetEmail } from "../utils/sendPasswordResetEmail.js";
import Applicant from "../../applicantService/models/applicantModel.js";
import Recruiter from "../../recruiterService/models/recruiterModel.js";
import logger from "../../../utils/logger.js"; 

export const signupRecruiter = async (req, res) => {
  const { email, password, type, ...details } = req.body;
  try {
  
    logger.info(`Signup attempt for recruiter with email: ${email}`);

    if (!email || !password || !details.name) {
      logger.warn("Missing required fields: email, password, or name.");
      return res.status(400).json({ message: "Email, password, and name are required." });
    }

    const existingUser = await UserAuth.findOne({ email });
    if (existingUser) {
      logger.warn(`Email ${email} is already in use.`);
      return res.status(409).json({ message: "Email is already in use." });
    }

    const user = new UserAuth({ email, password, type: type || "recruiter" });
    await user.save();

    logger.info(`Recruiter created with ID: ${user._id}`);

    const { data: recruiterDetails } = await axios.post("http://localhost:5002/api/recruiter/createRecruiter", {
      userId: user._id,
      name: details.name,
    },{
      withCredentials: true // Ensure that cookies are sent with the request
    });

    const token = generateJWTWithPrivateKey({
      _id: user._id,
      type: user.type, 
      roles: user.type,
    });

    res.cookie("authToken", token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: "Strict", 
      maxAge: 60 * 60 * 1000,
    });

    logger.info(`Token generated for recruiter: ${user._id}`);
    res.status(201).json({ recruiterDetails,token, type: user.type });
  } catch (error) {
    logger.error(`Error in signupRecruiter: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

export const signupApplicant = async (req, res) => {
  const { email, password, type, ...details } = req.body;
  try {
    logger.info(`Signup attempt for applicant with email: ${email}`);
  
    if (!email || !password || !details.name) {
      logger.warn("Missing required fields: email, password, or name.");
      return res.status(400).json({ message: "Email, password, and name are required." });
    }

    const existingUser = await UserAuth.findOne({ email });
    if (existingUser) {
      logger.warn(`Email ${email} is already in use.`);
      return res.status(409).json({ message: "Email is already in use." });
    }

    const user = new UserAuth({ email, password, type: type || "applicant" });
    await user.save();

    logger.info(`Applicant created with ID: ${user._id}`);

    const { data: applicantDetails } = await axios.post("http://localhost:5003/api/applicant/createApplicant", {
      userId: user._id,
      name: details.name
    },
    {
      withCredentials: true // Ensure that cookies are sent with the request
    });

    const token = generateJWTWithPrivateKey({
      _id: user._id,
      type: user.type, 
      roles: user.type,
    });
   
    res.cookie("authToken", token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: "Strict", 
      maxAge: 60 * 60 * 1000,
    });
    logger.info(`Token generated for applicant: ${user._id}`);
    res.status(201).json({ applicantDetails,token, type: user.type });
  } catch (error) {
    logger.error(`Error in signupApplicant: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

export const signupAdmin = async (req, res) => {
  const { email, password, type, ...details } = req.body;
  try {
    logger.info(`Signup attempt for admin with email: ${email}`);
    if (!email || !password || !details.name) {
      logger.warn("Missing required fields: email, password, or name.");
      return res.status(400).json({ message: "Email, password, and name are required." });
    }

    const existingUser = await UserAuth.findOne({ email });
    if (existingUser) {
      logger.warn(`Email ${email} is already in use.`);
      return res.status(409).json({ message: "Email is already in use." });
    }

    const user = new UserAuth({ email, password, type: type || "admin" });
    await user.save();

    logger.info(`Admin created with ID: ${user._id}`);

    const adminDetails = new Admin({
      userId: user._id,
      name: details.name,
    });

    await adminDetails.save();

    const token = generateJWTWithPrivateKey({
      _id: user._id,
      type: user.type, 
      roles: user.type,
    });

    res.cookie("authToken", token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: "Strict", 
      maxAge: 60 * 60 * 1000,
    });
    logger.info(`Token generated for admin: ${user._id}`);
    res.status(201).json({ adminDetails,token, type: user.type });
  } catch (error) {
    logger.error(`Error in signupAdmin: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    logger.info(`Login attempt for email: ${email}`);
    if (!email || !password) {
      logger.warn("Missing required fields: email or password.");
      return res.status(400).json({ message: "Email and password are required." });
    }
    
    const user = await UserAuth.findOne({ email });
    if (!user) {
      logger.warn(`User not found for email: ${email}`);
      return res.status(401).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      logger.warn("Invalid password.");
      return res.status(401).json({ message: "Invalid password." });
    }

    const role = user.type;


    const token = generateJWTWithPrivateKey({
      _id: user._id,
      type: user.type, 
      roles: user.type,
    });

   
    res.cookie("authToken", token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: "Strict", 
      maxAge: 60 * 60 * 1000,
    });

    logger.info(`Login successful for user: ${user._id}`);
    res.status(200).json({ token, role, userId:user._id }); 
  } catch (err) {
    logger.error(`Error in loginUser: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};


export const logout = (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  logger.info("Logout successful.");
  res.json({ message: "Logout successful" });
};


export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    logger.info(`Password reset requested for email: ${email}`);
    const user = await UserAuth.findOne({ email });
    if (!user) {
      logger.warn(`User not found for email: ${email}`);
      return res.status(404).json({ message: "User not found." });
    }

    const emailResponse = await sendPasswordResetEmail(email,user);

    if (!emailResponse.success) {
      logger.error("Failed to send reset email.");
      return res.status(500).json({ message: "Failed to send reset email. Please try again later." });
    }

    logger.info(`Password reset email sent to: ${email}`);
    res.status(200).json({ message: "Password reset link sent to your email." });
  } catch (error) {
    logger.error(`Error in forgotPassword: ${error.message}`);
  
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
};

export const resetPassword = async (req, res) => {
  const { password, token } = req.body; 
  try {
    if (!token) {
      logger.warn("Invalid or missing token.");
      return res.status(400).json({ message: "Invalid or missing token." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserAuth.findByIdAndUpdate(decoded.id, { password: hashedPassword });

    logger.info(`Password reset successfully for user: ${decoded.id}`);
    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("Error resetting password:", error);
    if (error.name === "TokenExpiredError") {
      logger.warn("Reset link has expired. Please request a new link.");
      res.status(400).json({ message: "Reset link has expired. Please request a new link." });
    } else {
      logger.error(`Error in resetPassword: ${error.message}`);
      res.status(400).json({ message: "Invalid or expired token." });
    }
  }
};
export const validateToken = async (req, res) => {
  const { token } = req.body;
  try {
    logger.info("Token is valid.");
    jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ message: "Token is valid." });
  } catch (error) {
    logger.error("Invalid or expired token.");
    res.status(400).json({ message: "Invalid or expired token." });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from UserAuth
    const users = await UserAuth.find({});

    // Process each user to fetch their respective details
    const usersWithDetails = await Promise.all(
      users.map(async (user) => {
        let userDetails = { email: user.email, type: user.type };

        if (user.type === "admin") {
          const admin = await Admin.findOne({ userId: user._id });
          userDetails = { ...userDetails, ...admin?._doc };
        } else if (user.type === "applicant") {
          const applicant = await Applicant.findOne({ userId: user._id });
          userDetails = { ...userDetails, ...applicant?._doc };
        } else if (user.type === "recruiter") {
          const recruiter = await Recruiter.findOne({ userId: user._id });
          userDetails = { ...userDetails, ...recruiter?._doc };
        }

        return userDetails;
      })
    );

    res.status(200).json(usersWithDetails);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    // GET ID!
    const ID = req.params.id;

    // DELETE USER WITH THIS ID!
    const deletedUser = await UserAuth.findByIdAndDelete(ID);

    // GIVE SUCCESS RESPONSE!
    res
      .status(200)
      .json({ message: "User deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getUserDetails = async (req, res) => {
  try {
    const ID = req.params.id;

    const user = await UserAuth.findById(ID);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let userDetails = { email: user.email, role: user.type, userId: user._id };

    if (user.type === "admin") {
      const admin = await Admin.findOne({ userId: ID });
      userDetails = { ...userDetails, ...admin?._doc };
    } else if (user.type === "applicant") {
      const applicant = await Applicant.findOne({ userId: ID });
      userDetails = { ...userDetails, ...applicant?._doc };
    } else if (user.type === "recruiter") {
      const recruiter = await Recruiter.findOne({ userId: ID });
      userDetails = { ...userDetails, ...recruiter?._doc };
    }

    return res.status(200).json({ success: true, userDetails });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getRoleModel = (role) => {
  switch (role) {
    case "admin":
      return Admin;
    case "recruiter":
      return Recruiter;
    case "applicant":
      return Applicant;
    default:
      return null;
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, role } = req.body;

    if (!role) {
      return res
        .status(400)
        .json({ success: false, message: "Role is required" });
    }

    const roleModel = getRoleModel(role);
    if (!roleModel) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    if (email) {
      await UserAuth.findByIdAndUpdate(
        id,
        { email },
        { new: true, runValidators: true }
      );
    }

    if (name) {
      await roleModel.findOneAndUpdate(
        { userId: id },
        { name },
        { new: true, runValidators: true }
      );
    }

    res
      .status(200)
      .json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Old and new passwords are required",
        });
    }

    const user = await UserAuth.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect old password" });
    }

    user.password = newPassword;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
