import { TCaptain } from "../interfaces/captain.interface";
import Captain from "../models/captain.model";

const createCaptainToDB = async (payload: TCaptain) => {
  const {
    fullname: { firstname, lastname },
    email,
    password,
    vehicle: { capacity, color, plate, vehicleType },
    status,
    location,
    socketId,
  } = payload;

  if (
    !firstname ||
    !email ||
    !password ||
    !capacity ||
    !color ||
    !plate ||
    !vehicleType
  ) {
    throw new Error("All fields are required");
  }

  try {
    const captain = await Captain.create({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
      vehicle: {
        capacity,
        color,
        plate,
        vehicleType,
      },
      status,
      location,
      socketId,
    });

    //   generateAuthToken is created using mongoose schema.methods and this function works with created instances
    const token = captain.generateAuthToken();

    return { captain, token };
  } catch (error: any) {
    if (error.code === 11000) {
      const error = new Error("Email already exists");
      (error as any).status = 409;
      throw error;
    }
    throw error;
  }
};

const loginCaptainFromDB = async (payload: Partial<TCaptain>) => {
  const { email, password } = payload;

  if (!email || !password) {
    throw new Error("All fields are required");
  }

  const captain = await Captain.findOne({ email }).select("+password");

  if (!captain) {
    throw new Error("Invalid credentials");
  }

  // Checks if the password is correct
  const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = captain.generateAuthToken();

  // Making the captain document as plain object
  const captainData = captain.toObject();
  delete (captainData as { password?: string }).password; // Remove the password field from the object

  return { captain: captainData, token };
};

export const captainServices = { createCaptainToDB, loginCaptainFromDB };
