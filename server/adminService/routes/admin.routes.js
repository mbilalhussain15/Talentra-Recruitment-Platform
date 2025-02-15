import express from 'express'
import { deleteAdminById, getAllAdmins } from '../controllers/admin.controller.js'
import rateLimit from "express-rate-limit";

const router = express.Router()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 requests per `window` (here, per 15 minutes) to make it easy for testing.
    message: "Too many requests from this IP, please try again after 15 minutes."
});
 
router.use(limiter);

router.get('/get-all-admins', getAllAdmins)

router.delete('/delete-admin/:id', deleteAdminById)

export default router
