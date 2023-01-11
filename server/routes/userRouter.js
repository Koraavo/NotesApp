import express from "express";
import userCtrl from "../controllers/userCtrl.js";

const userRouter = express.Router();

// link = localhost:5000/users/register

// Register
userRouter.post("/register", userCtrl.registerUser);

// Login
userRouter.post("/login", userCtrl.loginUser);

// verify token
userRouter.get("/verify", userCtrl.verifiedToken);
export default userRouter;
