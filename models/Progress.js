import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  weight: Number,
  bodyFat: Number,
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Progress", progressSchema);
