import { Router } from "express";

import validator from "../middlewares/validator.js";
import authValidator from "../modules/Auth/validatorSchema.js";
import authController from "../modules/Auth/auth.controller.js";
import authMiddleware from "../middlewares/auth.js";
const route = Router();

route.post("/login", validator(authValidator.loginSchema), authController.login)
route.post("/refresh_token", authController.refreshToken);
route.post("/logout", authController.logout);

export default route;