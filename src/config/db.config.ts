import mongoose from "mongoose";
import { serverConfig } from ".";


async function connectDB(){
  try {
    if (serverConfig.NODE_ENV === "development") {
      console.log(" DB URI:", serverConfig.DEV_DB_URI);
      await mongoose.connect(serverConfig.DEV_DB_URI);
      console.log("DB connected in development mode");
    }
    else if (serverConfig.NODE_ENV === "production") {
      await mongoose.connect(serverConfig.PROD_DB_URI);
      console.log("DB connected in production mode");
    }
  } catch (error) {
    console.log(error);
    throw new Error("DB connection failed");
  }
}

export default connectDB;