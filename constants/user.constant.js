const { body } = require("express-validator");

const validateRegistration = [
  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .notEmpty()
    .withMessage("Email is required"),
  body("firstname")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters")
    .notEmpty()
    .withMessage("First name is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .notEmpty()
    .withMessage("Password is required"),
];

const validateLogin = [
  body("email").notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

module.exports = { validateRegistration, validateLogin };
