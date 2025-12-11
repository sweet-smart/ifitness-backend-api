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

// -------------------- DB CONNECTION --------------------
connectDB();

// -------------------- ROOT ROUTE (Fix for Render "Cannot GET /") --------------------
app.get("/", (req, res) => {
  res.send("FitnessAI Backend is running...");
});

// -------------------- HEALTH CHECK --------------------
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Backend connected",
    timestamp: Date.now(),
  });
});

// -------------------- LOGIN ALIAS ROUTE --------------------
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const User = (await import("./models/User.js")).default;
    const bcrypt = (await import("bcryptjs")).default;
    const jwt = (await import("jsonwebtoken")).default;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -------------------- PROTECTED ROUTES --------------------
app.use("/api/auth", authRoutes);
app.use("/api/users", verifyToken, userRoutes);
app.use("/api/workouts", verifyToken, workoutRoutes);
app.use("/api/meals", verifyToken, mealRoutes);
app.use("/api/progress", verifyToken, progressRoutes);

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
