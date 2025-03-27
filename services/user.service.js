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

    return user;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Email already exists");
    }
    throw error;
  }
};

module.exports = { createUserToDB };
