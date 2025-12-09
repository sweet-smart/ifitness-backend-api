import mongoose from "mongoose";

const mealLogSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  meal: String,
  calories: Number,
  date: { type: Date, default: Date.now },
});

export default mongoose.model("MealLog", mealLogSchema);
