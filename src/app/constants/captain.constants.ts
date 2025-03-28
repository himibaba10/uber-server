import { body } from "express-validator";

const validateCaptainRegistration = [
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
  body("vehicle.color").notEmpty().withMessage("Vehicle color is required"),
  body("vehicle.plate").notEmpty().withMessage("Vehicle plate is required"),
  body("vehicle.capacity")
    .isInt({ min: 1 })
    .withMessage("Vehicle capacity must be at least 1"),
  body("vehicle.vehicleType")
    .isIn(["car", "motorcycle", "auto"])
    .withMessage("Invalid vehicle type")
    .notEmpty()
    .withMessage("Vehicle type is required"),
];

const validateCaptainLogin = [
  body("email").notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const captainConstants = { validateCaptainRegistration, validateCaptainLogin };
export default captainConstants;
