const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const userRouter = require("./routes/user.route");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //for getting form data

// Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/users", userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ success: false, errors: err });
});

module.exports = app;
