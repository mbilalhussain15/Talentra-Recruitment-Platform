import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectdb.js";
import adminRoutes from "./routes/admin.routes.js";
import path from 'path'

dotenv.config({ path: path.resolve("../../.env") });

const app = express();

app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

connectDB();

app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
