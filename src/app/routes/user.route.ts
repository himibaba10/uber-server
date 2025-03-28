import { Router } from "express";

import userConstants from "../constants/user.constant";
import { userControllers } from "../controllers/user.controller";
import authUser from "../middlewares/auth";

const userRouter = Router();

userRouter.post(
  "/register",
  userConstants.validateUserRegistration,
  userControllers.registerUser
);

userRouter.post(
  "/login",
  userConstants.validateUserLogin,
  userControllers.loginUser
);

userRouter.get("/profile", authUser, userControllers.getUserProfile);

userRouter.post("/logout", userControllers.logoutUser);

export default userRouter;
