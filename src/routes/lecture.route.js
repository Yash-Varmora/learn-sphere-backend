import express from "express";
import lectureController from "../modules/Lecture/lecture.controller.js";
import { createLectureSchema, updateLectureSchema } from "../modules/Lecture/validatorSchema.js";
import authMiddleware from "../middlewares/auth.js";
import authorizeInstructor from "../middlewares/authorize.js";
import { validate } from "../middlewares/validation.middleware.js";

const router = express.Router();

router.post(
    "/:sessionId",
    authMiddleware,
    authorizeInstructor,
    validate(createLectureSchema),
    lectureController.createLecture
);
router.get(
    "/completed",
    authMiddleware,
    lectureController.getCompletedLecturesByUserId
);
router.get("/:id", authMiddleware, lectureController.getLecture);
router.get("/session/:sessionId", authMiddleware, lectureController.getLecturesBySession);
router.put(
    "/:id",
    authMiddleware,
    authorizeInstructor,
    validate(updateLectureSchema),
    lectureController.updateLecture
);
router.delete("/:id", authMiddleware, authorizeInstructor, lectureController.deleteLecture);
router.post(
    "/:lectureId/completed",
    authMiddleware,
    lectureController.markLectureAsCompleted
);


export default router;