import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
var cookieParser = require("cookie-parser");

import userRouter from "./app/routes/user.route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import captainRouter from "./app/routes/captain.route";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //for getting form data
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/users", userRouter);
app.use("/captains", captainRouter);

// Error handling middleware
app.use(globalErrorHandler);

export default app;
