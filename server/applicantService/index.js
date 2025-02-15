import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import connectDB from "./config/connectdb.js";
import applicantRoutes from "./routes/applicantRoutes.js";
import path from "path";

// Use import.meta.url to get the directory name in ES module scope
const __dirname = path.dirname(new URL(import.meta.url).pathname);

dotenv.config({ path: path.resolve("../../.env") });

const app = express();

// CORS configuration with credentials
const corsOptions = {
    origin: "http://localhost:5173", // Frontend URL
    methods: "GET,POST,PUT,DELETE",  // Allowed HTTP methods
    credentials: true,               // Allow credentials (cookies, etc.)
};

// Use CORS middleware with specific configuration
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());

connectDB();

// Serve static files (uploads folder)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/applicant", applicantRoutes);

const PORT = process.env.PORT_APPLICANT_SERVICE || 4003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// import express from "express";
// import dotenv from "dotenv";
// import cors from 'cors';
// import connectDB from "./config/connectdb.js";
// import applicantRoutes from "./routes/applicantRoutes.js";
// import path from "path";

// dotenv.config({ path: path.resolve("../../.env") });

// const app = express();

// app.use(cors());
// app.use(express.json());

// connectDB();

// const corsOptions = {
// 	origin: "http://localhost:5173",
// 	methods: "GET,POST,PUT,DELETE",
// 	credentials: true,
// };
// app.use(cors(corsOptions));

// app.use("/api/applicant", applicantRoutes);

// const PORT = process.env.PORT_APPLICANT_SERVICE || 4003;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
