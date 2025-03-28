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

export const captainControllers = {
  registerCaptain,
};
