import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const router = express.Router();
const oauth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, role, password } = req.body;
  try {
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      role,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Google OAuth
router.post("/google", async (req, res) => {
  const { token } = req.body;
  try {
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const ticket = await oauth2Client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, picture } = ticket.getPayload();

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        role: "user",
        googleId: ticket.getUserId(),
        profilePic: picture,
      });
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ user, token: jwtToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
