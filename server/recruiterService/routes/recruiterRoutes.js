import express from "express";
import { createRecruiter, getAllRecruiters, getRecruiter, updateRecruiter } from "../controllers/recruiterController.js";
import rateLimit from "express-rate-limit";

const app = express();
const router = express.Router();

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, 
//     max: 1000, 
//     message: "Too many requests from this IP, please try again after 15 minutes."
// });
 
// router.use(limiter);

router.post("/createRecruiter",createRecruiter);
router.put("/updateRecruiter/:userId", updateRecruiter);
router.get("/getRecruiterByID/:userId", getRecruiter);
router.get("/getAllRecruiters", getAllRecruiters);

  
export default router;