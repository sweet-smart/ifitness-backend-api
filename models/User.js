import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["trainer", "trainee"], required: true },
    password: { type: String, required: true }, // Add password field
  },
  { timestamps: true }
);

// Fix OverwriteModelError by checking if the model already exists
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
