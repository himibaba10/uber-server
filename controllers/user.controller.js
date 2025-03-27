const { createUserToDB, loginUserFromDB } = require("../services/user.service");
const validateErrors = require("../utils/validateErrors");

const registerUser = async (req, res, next) => {
  if (validateErrors(req, res)) return;

  try {
    const { user, token } = await createUserToDB(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { user, token },
    });
  } catch (error) {
    next({ status: error.status, message: error.message });
  }
};

const loginUser = async (req, res, next) => {
  if (validateErrors(req, res)) return;

  try {
    const { user, token } = await loginUserFromDB(req.body);

    res.cookie("token", token);

    res.status(201).json({
      success: true,
      message: "User logged in successfully",
      data: { user, token },
    });
  } catch (error) {
    next({ common: { msg: error.message } });
  }
};

const getUserProfile = async (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "User profile fetched successfully",
    data: req.user,
  });
};

const logoutUser = async (req, res, next) => {
  res.clearCookie("token");

  return res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};

module.exports = { registerUser, loginUser, getUserProfile, logoutUser };
