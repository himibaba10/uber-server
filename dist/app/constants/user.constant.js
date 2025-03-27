"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validateRegistration = [
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Invalid email")
        .notEmpty()
        .withMessage("Email is required"),
    (0, express_validator_1.body)("firstname")
        .isLength({ min: 2 })
        .withMessage("First name must be at least 2 characters")
        .notEmpty()
        .withMessage("First name is required"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters")
        .notEmpty()
        .withMessage("Password is required"),
];
const validateLogin = [
    (0, express_validator_1.body)("email").notEmpty().withMessage("Email is required"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
];
exports.default = { validateRegistration, validateLogin };
