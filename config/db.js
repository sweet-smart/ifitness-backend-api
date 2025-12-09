import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGO_URI || "mongodb://localhost:27017/fitness_api";
    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
