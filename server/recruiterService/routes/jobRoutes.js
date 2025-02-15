import express from 'express';
import { addJob, deleteJob, getAllJobs, getFilteredJobs, getJobById, getJobsByRecruiterId, getTopJobsByRecruiterId, updateJob } from '../controllers/jobController.js';
import { restrictToOwnData, verifyRole } from "../../authService/utils/verifyRole.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, 
//     max: 1000, 
//     message: "Too many requests from this IP, please try again after 15 minutes."
// });

// router.use(limiter);

router.post("/:userId/createJob",
       // verifyRole(["recruiter"]),
       addJob);
 
router.put("/updateJob/:id",
       // verifyRole(["recruiter"]),
       // restrictToOwnData("id"),
       updateJob);
 
router.delete("/deleteJob/:id",
       //  verifyRole(["recruiter"]),
       //  restrictToOwnData("id"),
        deleteJob);
 
router.get("/getAllJob",
       getAllJobs);

router.get("/getJobByID/:jobId",getJobById);

router.get("/getJobsByRecruiter/:recruiterId",
       // verifyRole(["recruiter"]),
       // restrictToOwnData("recruiterId"),
       getJobsByRecruiterId);

router.get("/getFilteredJobs",getFilteredJobs);

router.get("/getTopJobsByRecruiter/:userId",
       // verifyRole(["recruiter"]),
       // restrictToOwnData("userId"),
       getTopJobsByRecruiterId);
 
export default router;