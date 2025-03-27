import { userServices } from "./../services/user.service";
import { NextFunction, Request, Response } from "express";
import validateErrors from "../utils/validateErrors";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (validateErrors(req, res)) return;

  try {
    const { user, token } = await userServices.createUserToDB(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { user, token },
    });
  } catch (error: any) {
    next({ status: error.status, message: error.message });
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  if (validateErrors(req, res)) return;

  try {
    const { user, token } = await userServices.loginUserFromDB(req.body);

    res.cookie("token", token);

    res.status(201).json({
      success: true,
      message: "User logged in successfully",
      data: { user, token },
    });
  } catch (error: any) {
    next(error);
  }
};

const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: (req as any).user,
    });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("token");

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const userControllers = {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
};
