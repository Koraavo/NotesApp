// this is the main server file
// Backend is running with express and mongoose(mongodb as the database)
// dotenv is used to save all the environmental variables in an .env file
// cors takes care of cross-origin resource sharing

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import noteRouter from "./routes/noteRouter.js";
import cors from "cors";
// dotenv config needs to be initialised to use dotenv
dotenv.config({path:"./vars/.env"});

// app is being initialised
const app = express();
app.use(express.json());
app.use(cors());

// Global Routes
app.use("/users", userRouter);
app.use("/api/notes", noteRouter);

// Port saved in dotenv file
const PORT = process.env.PORT || 6001;

// connecting to a database if successful listen to the port else give the error
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}, Connected to MongoDB`));
  })
  .catch((error) => console.log(`${error} did not connect`));
