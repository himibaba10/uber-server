"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("../services/user.service");
const validateErrors_1 = __importDefault(require("../utils/validateErrors"));
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, validateErrors_1.default)(req, res))
        return;
    try {
        const { user, token } = yield (0, user_service_1.createUserToDB)(req.body);
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: { user, token },
        });
    }
    catch (error) {
        next({ status: error.status, message: error.message });
    }
});
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, validateErrors_1.default)(req, res))
        return;
    try {
        const { user, token } = yield (0, user_service_1.loginUserFromDB)(req.body);
        res.cookie("token", token);
        res.status(201).json({
            success: true,
            message: "User logged in successfully",
            data: { user, token },
        });
    }
    catch (error) {
        next({ common: { msg: error.message } });
    }
});
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({
        success: true,
        message: "User profile fetched successfully",
        data: req.user,
    });
});
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token");
    return res.status(200).json({
        success: true,
        message: "User logged out successfully",
    });
});
exports.default = { registerUser, loginUser, getUserProfile, logoutUser };
