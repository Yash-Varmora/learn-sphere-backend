import express from "express";
import authMiddleware from "../middlewares/auth.js";
import authorizeInstructor from "../middlewares/authorize.js";
import instructorController from "../modules/Instructor/instructor.controller.js";


const router = express.Router();

router.get("/overview", authMiddleware, authorizeInstructor, instructorController.getInstructorOverview)

export default router;