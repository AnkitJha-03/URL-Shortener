import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let retries = 0;
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 5000;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    retries++;
    console.error("Error connecting to MongoDB:", error);

    if (retries < MAX_RETRIES) {
      console.log("Retrying in 5 seconds...");
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      return connectDB();
    }

    console.log("Max retries reached. Exiting...");
    process.exit(1);
  }
};

export default connectDB;
