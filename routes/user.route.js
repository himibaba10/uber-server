const { Router } = require("express");
const { registerUser, loginUser } = require("../controllers/user.controller");
const {
  validateRegistration,
  validateLogin,
} = require("../constants/user.constant");

const userRouter = Router();

userRouter.post("/register", validateRegistration, registerUser);

userRouter.post("/login", validateLogin, loginUser);

module.exports = userRouter;
