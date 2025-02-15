import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectdb.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import recruiterRoutes from "./routes/recruiterRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";


dotenv.config({ path: path.resolve("../../.env") });

const app = express();
app.use(express.json());
app.use(cookieParser());

connectDB();

const corsOptions = {
	origin: "http://localhost:5173",
	methods: "GET,POST,PUT,DELETE",
	credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/job", jobRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/recruiter", recruiterRoutes);

const PORT = process.env.PORT_RECRUITER_SERVICE || 4002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
