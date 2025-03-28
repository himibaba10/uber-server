import { NextFunction, Request, Response } from "express";
import validateErrors from "../utils/validateErrors";
import { captainServices } from "../services/captain.service";

const registerCaptain = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (validateErrors(req, res)) return;

  try {
    const { captain, token } = await captainServices.createCaptainToDB(
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Captain created successfully",
      data: { captain, token },
    });
  } catch (error: any) {
    next({ status: error.status, message: error.message });
  }
};

const loginCaptain = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (validateErrors(req, res)) return;

  try {
    const { captain, token } = await captainServices.loginCaptainFromDB(
      req.body
    );

    // Set the token in a browser cookie
    res.cookie("token", token);

    res.status(201).json({
      success: true,
      message: "Captain logged in successfully",
      data: { captain, token },
    });
  } catch (error: any) {
    next(error);
  }
};

const getCaptainProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({
      success: true,
      message: "Captain profile fetched successfully",
      data: (req as any).captain,
    });
  } catch (error) {
    next(error);
  }
};

export const captainControllers = {
  registerCaptain,
  loginCaptain,
  getCaptainProfile,
};
