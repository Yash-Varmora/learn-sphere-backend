import enrollmentService from "../../services/enrollment.service.js";
import { CustomError, httpStatusCodes, responseStatus } from "../../constants/constants.js";
import { sendResponse } from "../../helpers/response.js";

const enrollInCourse = async (req, res, next) => { 
    try {
        const { id:userId } = req.user;
        const { courseId } = req.params;
        const enrollment = await enrollmentService.enrollInCourse(userId, courseId);
        return sendResponse(res, httpStatusCodes["Created"], responseStatus.SUCCESS, "Enrolled in course successfully", enrollment);
    } catch (error) {
        console.log("====> Error enrollInCourse", error.message);
        return next(error);
    }
}

const getEnrollmentsByUserId = async (req, res, next) => {
    try {
        const { id:userId } = req.user;
        const enrollments = await enrollmentService.getEnrollmentsByUserId(userId);
        return sendResponse(res, httpStatusCodes["OK"], responseStatus.SUCCESS, "Get enrollments by user ID successfully", enrollments);
    } catch (error) {
        console.log("====> Error getEnrollmentsByUserId", error.message);
        return next(error);
    }
}
const getEnrollmentsByCourseId = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const enrollments = await enrollmentService.getEnrollmentsByCourseId(courseId);
        return sendResponse(res, httpStatusCodes["OK"], responseStatus.SUCCESS, "Get enrollments by course ID successfully", enrollments);
    } catch (error) {
        console.log("====> Error getEnrollmentsByCourseId", error.message);
        return next(error);
    }
}

export default {
    enrollInCourse,
    getEnrollmentsByUserId,
    getEnrollmentsByCourseId
}