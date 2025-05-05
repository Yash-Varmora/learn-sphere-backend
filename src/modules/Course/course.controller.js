import { httpStatusCodes, responseStatus } from "../../constants/constants.js";
import { sendResponse } from "../../helpers/response.js";
import categoryService from "../../services/category.service.js";
import courseService from "../../services/course.service.js"

const createCourse = async (req, res, next) => {
    try {
        const courseData = {
            ...req.body,
            instructorId: req.user.instructorProfile.id
        };
        const course = await courseService.createCourse(courseData);
        return sendResponse(res, httpStatusCodes["Created"], responseStatus.SUCCESS, "Create course successfully", course)
    } catch (error) {
        console.log("====> Error createCourse", error.message)
        return next(error)
    }
}

const getCourse = async (req, res, next) => {
    try {
        const course = await courseService.getCourseById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        return sendResponse(res, httpStatusCodes["OK"], responseStatus.SUCCESS, "Get course successfully", course)
    } catch (error) {
        console.log("====> Error getCourse", error.message)
        return next(error)
    }
}

const getAllCourses = async (req, res, next) => {
    try {
        const { page } = req.query;
        const conditions = req.query;
        delete conditions.page;
        const courses = await courseService.getAllCourses(conditions, { page});
        return sendResponse(res, httpStatusCodes["OK"], responseStatus.SUCCESS, "Get all courses successfully", courses)
    } catch (error) {
        console.log("====> Error getAllCourses", error.message)
        return next(error)
    }
}

const updateCourse = async (req, res, next) => {
    try {
        const course = await courseService.getCourseById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        if (course.instructorId !== req.user.instructorProfile.id) {
            return res.status(403).json({ message: 'Not authorized to update this course' });
        }

        const updatedCourse = await courseService.updateCourse(req.params.id, req.body);
        return sendResponse(res, httpStatusCodes["OK"], responseStatus.SUCCESS, "Update course successfully", updatedCourse)
    } catch (error) {
        console.log("====> Error updateCourse", error.message)
        return next(error)
    }
}

const deleteCourse = async (req, res, next) => {
    try {
        const course = await courseService.getCourseById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        if (course.instructorId !== req.user.instructorProfile.id) {
            return res.status(403).json({ message: 'Not authorized to delete this course' });
        }

        await courseService.deleteCourse(req.params.id);
        return sendResponse(res, httpStatusCodes["OK"], responseStatus.SUCCESS, "Delete course successfully", { message: 'Course deleted successfully' })
    } catch (error) {
        console.log("====> Error deleteCourse", error.message)
        return next(error)
    }
}

const getInstructorCourses = async (req, res, next) => {
    try {
        const courses = await courseService.getCoursesByInstructor(req.user.instructorProfile.id);
        return sendResponse(res, httpStatusCodes["OK"], responseStatus.SUCCESS, "Get instructor courses successfully", courses)
    } catch (error) {
        console.log("====> Error getInstructorCourses", error.message)
        return next(error)
    }
}

const getAllCategory = async (req, res, next) => {
    try {
        const categories = await categoryService.getAllCategories();
        return sendResponse(res, httpStatusCodes["OK"], responseStatus.SUCCESS, "Get all categories successfully", categories)
    } catch (error) {
        console.log(error)
        console.log("====> Error getAllCategory", error.message)
        return next(error)
    }
}

export default {
    createCourse,
    getCourse,
    getAllCourses,
    updateCourse,
    deleteCourse,
    getInstructorCourses,
    getAllCategory
}