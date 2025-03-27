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
const user_model_1 = __importDefault(require("../models/user.model"));
const createUserToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, password } = payload;
    if (!firstname || !email || !password) {
        throw new Error("All fields are required");
    }
    try {
        const user = yield user_model_1.default.create({
            fullname: {
                firstname,
                lastname,
            },
            email,
            password,
        });
        //   generateAuthToken is created using mongoose schema.methods and this function works with created instances
        const token = user.generateAuthToken();
        return { user, token };
    }
    catch (error) {
        if (error.code === 11000) {
            const error = new Error("Email already exists");
            error.status = 409;
            throw error;
        }
        throw error;
    }
});
const loginUserFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    if (!email || !password) {
        throw new Error("All fields are required");
    }
    const user = yield user_model_1.default.findOne({ email }).select("+password");
    if (!user) {
        throw new Error("Invalid credentials");
    }
    // Checks if the password is correct
    const isMatch = yield user.comparePassword(password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    const token = user.generateAuthToken();
    return { user, token };
});
exports.default = { createUserToDB, loginUserFromDB };
