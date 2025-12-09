import express from "express";
import {
  createWorkout,
  getWorkouts,
} from "../controller/workoutController.js";

const router = express.Router();

router.post("/", createWorkout);
router.get("/", getWorkouts);

export default router;
