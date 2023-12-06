import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.model";
import Group from "../models/Group.model";

dotenv.config();

const MONGO_URI: string = process.env.MONGODB_URI || "";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    const databaseName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${databaseName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
