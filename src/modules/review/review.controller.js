import reviewService from "../../services/review.service.js";
import { httpStatusCodes, responseStatus } from "../../constants/constants.js";
import { sendResponse } from "../../helpers/response.js";

const createReview = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { courseId } = req.params
        const { review, rating } = req.body;
        const reviewData = { review, rating, userId, courseId };
        const createdReview = await reviewService.createReview(reviewData);
        return sendResponse(res, httpStatusCodes["Created"], responseStatus.SUCCESS, "Create review successfully", createdReview);
    } catch (error) {
        console.log("====> Error createReview", error.message)
        return next(error);
    }
}

const getReviews = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const reviews = await reviewService.getCourseReviews(courseId);
        return sendResponse(res, httpStatusCodes["OK"], responseStatus.SUCCESS, "Get reviews successfully", reviews);
    } catch (error) {
        console.log(error)
        console.log("====> Error getReviews", error.message)
        return next(error);
    }
}

const getAverageRating = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const avgRating = await reviewService.getAverageRating(courseId);
        return sendResponse(
            res,
            httpStatusCodes["OK"],
            responseStatus.SUCCESS,
            "Fetched average rating successfully",
            { averageRating: avgRating }
        );
    } catch (error) {
        console.log("====> Error getAverageRating", error.message);
        return next(error);
    }
}


export default {
    createReview,
    getReviews,
    getAverageRating
}