import { Router } from "express";

import { captainControllers } from "../controllers/captain.controller";
import captainConstants from "../constants/captain.constants";

const captainRouter = Router();

captainRouter.post(
  "/register",
  captainConstants.validateCaptainRegistration,
  captainControllers.registerCaptain
);

export default captainRouter;
