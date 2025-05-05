import lectureService from "../../services/lecture.service.js";
import { CustomError, httpStatusCodes, responseStatus } from "../../constants/constants.js";
import { sendResponse } from "../../helpers/response.js";
import completedLectureService from "../../services/completedLecture.service.js";

const createLecture = async (req, res, next) => {
    try {
        const lectureData = {
            ...req.body,
            sessionId: req.params.sessionId
        };
        if (!lectureData.sessionId) {
            return next(new CustomError(httpStatusCodes["Bad Request"], responseStatus.ERROR, "Session ID is required"))
        }
        const lecture = await lectureService.createLecture(lectureData);
        return sendResponse(res, httpStatusCodes["Created"], responseStatus.SUCCESS, "Create lecture successfully", lecture)
    } catch (error) {
        console.log("====> Error createLecture", error.message)
        return next(error)
    }
}

const getLecture = async (req, res, next) => {
    try {
        const { id } = req.params;
        const lecture = await lectureService.getLectureById(id);

        if (!lecture) {
            return next(new CustomError(httpStatusCodes["Not Found"], responseStatus.ERROR, "Lecture not found"))
        }

        return sendResponse(res, httpStatusCodes["OK"], responseStatus.SUCCESS, "Get lecture successfully", lecture)
    } catch (error) {
        console.log("====> Error getLecture", error.message)
        return next(error)
    }
}

const getLecturesBySession = async (req, res, next) => {
    try {
        const { sessionId } = req.params;
        const lectures = await lectureService.getLectureBySessionId(sessionId);

        return sendResponse(res, httpStatusCodes["OK"], responseStatus.SUCCESS, "Get lectures by session successfully", lectures)
    } catch (error) {
        console.log("====> Error getLecturesBySession", error.message)
        return next(error)
    }
}

const updateLecture = async (req, res, next) => {
    try {
        const { id } = req.params;
        const lecture = await lectureService.updateLecture(id, req.body);

        if (!lecture) {
            return next(new CustomError(httpStatusCodes["Not Found"], responseStatus.ERROR, "Lecture not found"))
        }

        return sendResponse(res, httpStatusCodes["OK"], responseStatus.SUCCESS, "Update lecture successfully", lecture)
    } catch (error) {
        console.log("====> Error updateLecture", error.message)
        return next(error)
    }
}
const deleteLecture = async (req, res, next) => {
    try {
        const id = req.params.id;
        const lecture = await lectureService.deleteLecture(id);
        if (!lecture) {
            return next(new CustomError(httpStatusCodes["Not Found"], responseStatus.ERROR, "Lecture not found"))
        }
        return sendResponse(res, httpStatusCodes["OK"], responseStatus.SUCCESS, "Delete lecture successfully", lecture)
    } catch (error) {
        console.log("====> Error deleteLecture", error.message)
        return next(error)
    }
}

const markLectureAsCompleted = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const {lectureId } = req.params;
        const completedLecture = await completedLectureService.markLectureAsCompleted(userId, lectureId);
        return sendResponse(res, httpStatusCodes["OK"], responseStatus.SUCCESS, "Mark lecture as completed successfully", completedLecture)
    } catch (error) {
        console.log("====> Error markLectureAsCompleted", error.message)
        return next(error)
    }
}

const getCompletedLecturesByUserId = async (req, res, next) => { 
    try {
        const userId = req.user.id;
        const completedLectures = await completedLectureService.getComputedLecturesByUserId(userId);
        return sendResponse(res, httpStatusCodes["OK"], responseStatus.SUCCESS, "Get completed lectures successfully", completedLectures)
    } catch (error) {
        console.log("====> Error getCompletedLecturesByUserId", error.message)
        return next(error)
    }
}

export default {
    createLecture,
    getLecture,
    getLecturesBySession,
    updateLecture,
    deleteLecture,
    markLectureAsCompleted,
    getCompletedLecturesByUserId
}