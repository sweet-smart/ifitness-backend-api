import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { verifyToken } from "./middleware/auth.js"; // Import the middleware

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";
import mealRoutes from "./routes/mealRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// 🔥 CRITICAL: Health Route MUST EXIST
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Backend connected",
  });
});

// 🔥 Mount Routes Correctly
app.use("/api/auth", authRoutes);
app.use("/api/users", verifyToken, userRoutes); // Protect this route
app.use("/api/workouts", verifyToken, workoutRoutes); // Protect this route
app.use("/api/meals", verifyToken, mealRoutes); // Protect this route
app.use("/api/progress", verifyToken, progressRoutes); // Protect this route

// Server start
app.listen(9000, () => console.log("API running on http://localhost:9000"));
