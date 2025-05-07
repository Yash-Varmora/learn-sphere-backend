import { httpStatusCodes, responseStatus } from "../../constants/constants.js";
import { sendResponse } from "../../helpers/response.js";
import courseService from "../../services/course.service.js";
import { format,startOfMonth } from "date-fns";

const getInstructorOverview = async (req, res, next) => {
    try {
        const instructorId = req.user.instructorProfile.id
        const limit = parseInt(req.query.limit) || 5;

        const courses = await courseService.getCoursesByInstructor(instructorId)

        const totalCourses = courses.length;
        const totalEnrollments = courses.reduce((acc, c) => acc + c.enrollments.length, 0);
        const totalRatings = courses.flatMap(c => c.courseReviews.map(r => r.rating));
        const averageRating = totalRatings.length
            ? (totalRatings.reduce((a, b) => a + b, 0) / totalRatings.length).toFixed(1)
            : 0;
        const totalLectures = courses.reduce(
            (acc, c) => acc + c.sessions.reduce((sAcc, s) => sAcc + s.lectures.length, 0),
            0
        );

        const enrollments = courses.flatMap(c => c.enrollments);
        const monthlyCounts = enrollments.reduce((acc, enrollment) => {
            const month = format(startOfMonth(new Date(enrollment.createdAt)), 'yyyy-MM');
            acc[month] = (acc[month] || 0) + 1;
            return acc;
        }, {});

        const trendData = Object.entries(monthlyCounts).map(([month, count]) => ({
            month,
            count,
        }));

        trendData.sort((a, b) => a.month.localeCompare(b.month));

        const courseEnrollCounts = courses.map((course) => ({
            title: course.title,
            count: course.enrollments.length,
        }))

        courseEnrollCounts.sort((a, b) => b.count - a.count);

        const topCourses = courseEnrollCounts.slice(0, limit);

        const courseRatings = courses.map((course) => {
            const total = course.courseReviews.reduce((sum, r) => sum + r.rating, 0);
            const avg = course.courseReviews.length
                ? total / course.courseReviews.length
                : 0;
            return {
                courseTitle: course.title,
                averageRating: Number(avg.toFixed(1)),
            };
        })

        const data = {
            totalCourses,
            totalEnrollments,
            averageRating,
            totalLectures,
            trendData,
            topCourses,
            courseRatings
        }

        return sendResponse(res, httpStatusCodes["OK"], responseStatus.SUCCESS, "Get instructor Overview successfully", data)
    } catch (error) {
        console.log("====> Error getInstructorOverview", error.message)
        return next(error)

    }
}

export default {
    getInstructorOverview
}