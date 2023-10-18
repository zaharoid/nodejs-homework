import express from "express";
import authController from "../../controllers/auth.js";
import {
  validationBody,
  isEmptyBody,
  authenticate,
} from "../../middlewares/index.js";
import {
  userValidationSchema,
  userSubscriptionValidationSchema,
} from "../../models/User.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validationBody(userValidationSchema),
  authController.signup
);

authRouter.post(
  "/login",
  isEmptyBody,
  validationBody(userValidationSchema),
  authController.login
);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.patch(
  "",
  authenticate,
  isEmptyBody,
  validationBody(userSubscriptionValidationSchema),
  authController.updateSubscription
);

export default authRouter;
