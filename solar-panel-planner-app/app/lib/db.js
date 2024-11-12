import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database");
    return connection;
  } catch (error) {
    console.log(`Error connecting to database: ${error}`);
  }
}
