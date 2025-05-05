import express from "express";
import authMiddleware from "../middlewares/auth.js";
import authorizeInstructor from "../middlewares/authorize.js";
import { validate, validateParams } from "../middlewares/validation.middleware.js";
import courseController from "../modules/Course/course.controller.js";
import { createCourseSchema, updateCourseSchema, courseIdSchema } from "../modules/Course/validatorSchema.js";

const router = express.Router();


router.get("/", courseController.getAllCourses);

router.get(
    "/categories",
    courseController.getAllCategory
);
router.get("/:id", validateParams(courseIdSchema), courseController.getCourse);

router.post(
    "/",
    authMiddleware,
    authorizeInstructor,
    validate(createCourseSchema),
    courseController.createCourse
);

router.put(
    "/:id",
    authMiddleware,
    authorizeInstructor,
    validateParams(courseIdSchema),
    validate(updateCourseSchema),
    courseController.updateCourse
);

router.delete(
    "/:id",
    authMiddleware,
    authorizeInstructor,
    validateParams(courseIdSchema),
    courseController.deleteCourse
);

router.get(
    "/instructor/courses",
    authMiddleware,
    authorizeInstructor,
    courseController.getInstructorCourses
);


export default router; 