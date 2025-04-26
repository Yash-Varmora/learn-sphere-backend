import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";
import validator from "../middlewares/validator.js";
import userController from "../modules/User/user.controller.js";
import validatorSchema from "../modules/User/validatorSchema.js";

const route = Router();

route.get("/", authMiddleware, userController.getUsers)
route.post("/register", validator(validatorSchema.createUserSchema), userController.addUser)
route.get("/me", authMiddleware, userController.getUserMe)
route.put("/me", authMiddleware, validator(validatorSchema.updateUserSchema), userController.updateUserMe)
route.get("/:id", authMiddleware, userController.getUserByID)
route.put("/:id", authMiddleware, validator(validatorSchema.updateUserSchema), userController.updateUser)
route.delete("/:id", authMiddleware, userController.deleteUser)

export default route;