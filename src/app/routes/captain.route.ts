import { Router } from "express";

import { captainControllers } from "../controllers/captain.controller";
import captainConstants from "../constants/captain.constants";
import auth from "../middlewares/auth";

const captainRouter = Router();

captainRouter.post(
  "/register",
  captainConstants.validateCaptainRegistration,
  captainControllers.registerCaptain
);

captainRouter.post(
  "/login",
  captainConstants.validateCaptainLogin,
  captainControllers.loginCaptain
);

captainRouter.get(
  "/profile",
  auth.authCaptain,
  captainControllers.getCaptainProfile
);

captainRouter.post("/logout", captainControllers.logoutCaptain);

export default captainRouter;
