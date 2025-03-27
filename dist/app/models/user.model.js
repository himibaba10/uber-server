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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config");
const userSchema = new mongoose_1.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [2, "First name must be at least 2 characters long"],
            trim: true,
        },
        lastname: {
            type: String,
            minlength: [2, "Last name must be at least 2 characters long"],
            trim: true,
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        select: false, // Ensure password is not included in queries by default
    },
    socketId: {
        type: String,
    },
}, {
    timestamps: true,
});
// Hash password before creating
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        //   This ensures hash the password only it is modified
        if (this.isModified("password")) {
            this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.SALT));
        }
        next();
    });
});
userSchema.methods.generateAuthToken = function () {
    try {
        const token = jsonwebtoken_1.default.sign({ _id: this._id }, config_1.JWT_SECRET, { expiresIn: "24h" });
        return token;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
userSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.password) {
            throw new Error("Password not available. Make sure to select '+password' in the query.");
        }
        return yield bcrypt_1.default.compare(password, this.password);
    });
};
const User = (0, mongoose_1.model)("User", userSchema);
module.exports = User;
