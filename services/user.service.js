const User = require("../models/user.model");

const createUserToDB = async (payload) => {
  const { firstname, lastname, email, password } = payload;

  if (!firstname || !email || !password) {
    throw new Error("All fields are required");
  }

  try {
    const user = await User.create({
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
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Email already exists");
    }
    throw error;
  }
};

const loginUserFromDB = async (payload) => {
  const { email, password } = payload;

  if (!email || !password) {
    throw new Error("All fields are required");
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Checks if the password is correct
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = user.generateAuthToken();

    return { user, token };
  } catch (error) {
    throw error;
  }
};

module.exports = { createUserToDB, loginUserFromDB };
