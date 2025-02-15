import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectdb.js";
import jwksRoute from "./routes/jwksRoute.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config({ path: path.resolve("../../.env") });

const app = express();
app.use(express.json());
app.use(cookieParser());


const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: "GET,POST,PUT,DELETE,PATCH", 
    credentials: true,
};
app.use(cors(corsOptions));


connectDB();

app.use("/.well-known/jwks.json", jwksRoute);

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT_AUTH_SERVICE || 4001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
