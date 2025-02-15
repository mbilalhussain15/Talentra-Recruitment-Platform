import express from "express";
import rateLimit from "express-rate-limit";
import multer from "multer";

import {
    getAllApplicants,
    createApplicant,
    fetchJobs,
    fetchFilteredJobs,
    getJobsAppliedByApplicant,
    applyForJob,
    getApplicantsForJob,
    updateApplicationStatus,
    uploadResume,
    fetchResume,
    addFavouriteJob,
    fetchFavouriteJobs,
    getApplicantByUserId,
    updateApplicant,
} from "../controllers/jobController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 20 requests per `window` (here, per 15 minutes) to make it easy for testing.
    message: "Too many requests from this IP, please try again after 15 minutes."
});

router.use(limiter);

router.get("/getAllApplicants", getAllApplicants);
router.post("/createApplicant", createApplicant);
router.get("/getApplicantById/:userId", getApplicantByUserId);
router.put("/updateApplicant/:userId", updateApplicant);
router.post("/applyForJob", applyForJob);
router.get("/filterJobs", fetchFilteredJobs);
router.get("/appliedJobs/:userId", getJobsAppliedByApplicant);
router.get("/jobs/applicants/:jobId", getApplicantsForJob);
router.post("/uploadResume/:userId", upload.single("resume"), uploadResume);
router.get("/fetchResume/:userId", fetchResume);
router.put("/applications/status/:userId/:jobId", updateApplicationStatus);
router.post("/addFavouriteJob/", addFavouriteJob);
router.get("/fetchFavouriteJobs/:userId", fetchFavouriteJobs);
router.get("/fetchApplicants", getAllApplicants);
router.get("/fetchJobs", fetchJobs);
router.get("/:userId", getApplicantByUserId);
router.put("/:userId", upload.single("resume"), updateApplicant);

export default router;
