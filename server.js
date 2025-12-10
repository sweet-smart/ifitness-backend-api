import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { verifyToken } from "./middleware/auth.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";
import mealRoutes from "./routes/mealRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// DB Connection
connectDB();

// Health check for Render
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Backend connected",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", verifyToken, userRoutes);
app.use("/api/workouts", verifyToken, workoutRoutes);
app.use("/api/meals", verifyToken, mealRoutes);
app.use("/api/progress", verifyToken, progressRoutes);

// --- FIX FOR RENDER ---
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
