"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const user_constant_1 = require("../constants/user.constant");
const auth_1 = __importDefault(require("../middlewares/auth"));
const userRouter = (0, express_1.Router)();
userRouter.post("/register", user_constant_1.validateRegistration, user_controller_1.registerUser);
userRouter.post("/login", user_constant_1.validateLogin, user_controller_1.loginUser);
userRouter.get("/profile", auth_1.default, user_controller_1.getUserProfile);
userRouter.post("/logout", user_controller_1.logoutUser);
exports.default = userRouter;
