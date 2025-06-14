import mongoose from "mongoose";
export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected Successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};