const { validationResult } = require("express-validator");
const { createUserToDB } = require("../services/user.service");

const registerUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await createUserToDB(req.body);

    //   generateAuthToken is created using mongoose schema.methods and this function works with created instances
    const token = user.generateAuthToken();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { user, token },
    });
  } catch (error) {
    next({ common: { msg: error.message } });
  }
};

module.exports = { registerUser };
