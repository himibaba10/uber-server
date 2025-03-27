const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const User = require("../models/user.model");

const authUser = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next({ status: 401, message: "Unauthorized access" });
  }

  try {
    // Verify token
    const decoded = await jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded._id).select("-password"); // Exclude password

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    req.user = user;
    return next();
  } catch (error) {
    next({ status: 401, message: error.message });
  }
};

module.exports = authUser;
