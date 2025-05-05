import express from "express";
import authMiddleware from "../middlewares/auth.js";
import enrollmentController from "../modules/Enrollment/enrollment.controller.js";

const router = express.Router();

router.post(
    "/:courseId/enroll",
    authMiddleware,
    enrollmentController.enrollInCourse
);
router.get(
    "/user",
    authMiddleware,
    enrollmentController.getEnrollmentsByUserId
);
router.get(
    "/course/:courseId",
    authMiddleware,
    enrollmentController.getEnrollmentsByCourseId
);

export default router;