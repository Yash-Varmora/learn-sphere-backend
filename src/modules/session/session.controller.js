
import sessionService from "../../services/session.service.js";
import { httpStatusCodes, responseStatus } from "../../constants/constants.js";
import { sendResponse } from "../../helpers/response.js";

const createSession = async (req, res, next) => {
    try {
        const sessionData = {
            ...req.body,
            courseId: req.params.courseId
        };
        if (!sessionData.courseId) {
            return sendResponse(res, httpStatusCodes["Bad Request"], responseStatus.ERROR, "Course ID is required", null)
        }
        const session = await sessionService.createSession(sessionData);
        return sendResponse(res, httpStatusCodes["Created"], responseStatus.SUCCESS, "Create session successfully", session)
    } catch (error) {
        console.log("====> Error createSession", error.message)
        return next(error)
    }
}

const getSession = async (req, res, next) => {
    try {
        const { id } = req.params;
        const session = await sessionService.getSessionById(id);

        if (!session) {
            return sendResponse(res, httpStatusCodes["Not Found"], responseStatus.ERROR, "Session not found", null)
        }

        return sendResponse(res, httpStatusCodes["OK"], responseStatus.SUCCESS, "Get session successfully", session)
    } catch (error) {
        console.log("====> Error getSession", error.message)
        return next(error)
    }
}

const getSessionsByCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const sessions = await sessionService.getSessionsByCourseId(courseId);

        return sendResponse(res, httpStatusCodes["OK"], responseStatus.SUCCESS, "Get sessions by course successfully", sessions)
    } catch (error) {
        console.log("====> Error getSessionsByCourse", error.message)
        return next(error)
    }
}

const updateSession = async (req, res, next) => {
    try {
        const { id } = req.params;
        const session = await sessionService.updateSession(id, req.body);

        if (!session) {
            return sendResponse(res, httpStatusCodes["Not Found"], responseStatus.ERROR, "Session not found", null)
        }

        return sendResponse(res, httpStatusCodes["OK"], responseStatus.SUCCESS, "Update session successfully", session)
    } catch (error) {
        console.log("====> Error updateSession", error.message)
        return next(error)
    }
}

const deleteSession = async (req, res, next) => {
    try {
        const { id } = req.params;
        const session = await sessionService.deleteSession(id);

        if (!session) {
            return sendResponse(res, httpStatusCodes["Not Found"], responseStatus.ERROR, "Session not found", null)
        }

        return sendResponse(res, httpStatusCodes["OK"], responseStatus.SUCCESS, "Delete session successfully", session)
    } catch (error) {
        console.log("====> Error deleteSession", error.message)
        return next(error)
    }
}

export default {
    createSession,
    getSession,
    getSessionsByCourse,
    updateSession,
    deleteSession
} 