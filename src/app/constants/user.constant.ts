import { body } from "express-validator";

const validateRegistration = [
  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .notEmpty()
    .withMessage("Email is required"),
  body("fullname.firstname")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters")
    .notEmpty()
    .withMessage("First name is required"),
  body("fullname.lastname")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters"),
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

const userConstants = { validateRegistration, validateLogin };
export default userConstants;
