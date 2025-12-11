import WorkoutPlan from "../models/workoutPlan.js";

export const createWorkout = async (req, res) => {
  const workout = await WorkoutPlan.create(req.body);
  res.json(workout);
};

export const getWorkouts = async (req, res) => {
  const workouts = await WorkoutPlan.find();
  res.json(workouts);
};
