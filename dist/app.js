"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
var cookieParser = require("cookie-parser");
const user_route_1 = __importDefault(require("./app/routes/user.route"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true })); //for getting form data
app.use(cookieParser());
// Routes
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.use("/users", user_route_1.default);
// Error handling middleware
app.use(globalErrorHandler_1.default);
exports.default = app;
