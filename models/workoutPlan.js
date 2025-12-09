import mongoose from "mongoose";

const workoutPlanSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  exercises: [
    {
      name: String,
      sets: Number,
      reps: Number,
    },
  ],
});

export default mongoose.model("WorkoutPlan", workoutPlanSchema);
