import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/user.model";
import Captain from "../models/captain.model";

const authUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next({ status: 401, message: "Unauthorized access" });
  }

  try {
    // Verify token
    const decoded = (await jwt.verify(
      token,
      config.JWT_SECRET as string
    )) as jwt.JwtPayload;

    const user = await User.findById(decoded._id);
    if (!user) {
      return next({ status: 404, message: "User not found" });
    }

    (req as any).user = user; // Assign the user to the extended Request object
    return next();
  } catch (error: any) {
    return next({ status: 401, message: error.message });
  }
};

const authCaptain = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next({ status: 401, message: "Unauthorized access" });
  }

  try {
    // Verify token
    const decoded = (await jwt.verify(
      token,
      config.JWT_SECRET as string
    )) as jwt.JwtPayload;

    const captain = await Captain.findById(decoded._id);
    if (!captain) {
      return next({ status: 404, message: "User not found" });
    }

    (req as any).captain = captain; // Assign the user to the extended Request object
    return next();
  } catch (error: any) {
    return next({ status: 401, message: error.message });
  }
};

const auth = { authUser, authCaptain };

export default auth;
