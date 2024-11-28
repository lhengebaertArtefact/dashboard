import mongoose from "mongoose";

const MONGODB_URI: string = process.env.MONGODB_URI!;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connect to mongoDB");
  } catch (error) {
    console.log("error connecting to mongoDB:", error);
    process.exit(1);
  }
};

export default connectToDatabase;
