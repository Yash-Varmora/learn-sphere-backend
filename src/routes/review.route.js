import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import validator from "../middlewares/validator.js";
import reviewController from "../modules/review/review.controller.js";
import { createReviewSchema } from "../modules/review/validatorSchema.js";

const router = Router()

router.post("/:courseId/review", authMiddleware, validator(createReviewSchema), reviewController.createReview)
router.get("/:courseId/review", reviewController.getReviews)
router.get("/:courseId/average_rating", reviewController.getAverageRating);


export default router;