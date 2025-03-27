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
    next({ common: { msg: error.message } });
  }
};

const loginUser = async (req, res, next) => {
  if (validateErrors(req, res)) return;

  try {
    const { user, token } = await loginUserFromDB(req.body);

    res.status(201).json({
      success: true,
      message: "User logged in successfully",
      data: { user, token },
    });
  } catch (error) {
    next({ common: { msg: error.message } });
  }
};

module.exports = { registerUser, loginUser };
