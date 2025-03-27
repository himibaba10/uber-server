import { TUser } from "../interfaces/user.interface";
import User from "../models/user.model";

const createUserToDB = async (payload: TUser) => {
  const {
    fullname: { firstname, lastname },
    email,
    password,
  } = payload;

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
  } catch (error: any) {
    if (error.code === 11000) {
      const error = new Error("Email already exists");
      (error as any).status = 409;
      throw error;
    }
    throw error;
  }
};

const loginUserFromDB = async (payload: Partial<TUser>) => {
  const { email, password } = payload;

  if (!email || !password) {
    throw new Error("All fields are required");
  }

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
};

export const userServices = { createUserToDB, loginUserFromDB };
