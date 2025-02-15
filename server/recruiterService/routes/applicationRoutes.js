import express from "express";
import {fetchAllShortlistedApplicants, getAllShortlistedApplicants, getJobApplications, updateApplicationStatus} from "../controllers/applicationController.js";
import rateLimit from "express-rate-limit";
import { restrictToOwnData, verifyRole } from "../../authService/utils/verifyRole.js";

const app = express();
const router = express.Router();

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 1000, // Limit each IP to 20 requests per `window` (here, per 15 minutes) to make it easy for testing.
//     message: "Too many requests from this IP, please try again after 15 minutes."
// });

// router.use(limiter);

router.get("/jobs/applications/:jobId",
//        verifyRole(["recruiter"]),
//        restrictToOwnData("jobId"),
       getJobApplications);

router.put("/updatestatus/:userId/:jobId",
        // verifyRole(["recruiter"]),
        // restrictToOwnData("jobId"),
        updateApplicationStatus);

router.get('/shortlisted-candidates/:jobUserId',
        // verifyRole(["recruiter"]),
        // restrictToOwnData("jobUserId"),
         getAllShortlistedApplicants);

export default router;
