const { Router } = require("express");
const { body } = require("express-validator");
const { registerUser } = require("../controllers/user.controller");

const userRouter = Router();

userRouter.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("firstname")
      .isLength({ min: 2 })
      .withMessage("First name must be at least 2 characters"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  registerUser
);

module.exports = userRouter;
