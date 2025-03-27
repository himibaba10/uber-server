const { Router } = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
} = require("../controllers/user.controller");
const {
  validateRegistration,
  validateLogin,
} = require("../constants/user.constant");
const authUser = require("../middlewares/auth");

const userRouter = Router();

userRouter.post("/register", validateRegistration, registerUser);

userRouter.post("/login", validateLogin, loginUser);

userRouter.get("/profile", authUser, getUserProfile);

userRouter.post("/logout", logoutUser);

module.exports = userRouter;
