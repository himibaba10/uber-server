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

export const captainServices = { createCaptainToDB };
