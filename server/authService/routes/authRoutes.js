import express from "express";

import {
  signupRecruiter,
  signupApplicant,
  signupAdmin,
  logout,
  loginUser,
  forgotPassword,
  resetPassword,
  validateToken,
  getAllUsers,
  deleteUserById,
  getUserDetails,
  updateUserProfile,
  updateUserPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/recruiter/signup", signupRecruiter);
router.post("/applicant/signup", signupApplicant);
router.post("/admin/signup", signupAdmin);

router.post("/login", loginUser);
router.post("/logout", logout);

router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);
router.post("/validateToken", validateToken);

// DELETE USER ROUTES!
router.delete("/delete-user/:id", deleteUserById);

// GET ALL USERS!
router.get("/all-users", getAllUsers);

//Get Current User Details
router.get("/current-user-details/:id", getUserDetails);

router.patch("/update-profile/:id", updateUserProfile);
router.patch("/update-password/:id", updateUserPassword);

export default router;
