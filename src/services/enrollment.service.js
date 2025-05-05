import prisma from "../configs/prisma.config.js";

const enrollmentService = {
    enrollInCourse: async (userId, courseId) => {
        try {
            const enrollment = await prisma.enrollment.create({
                data: {
                    userId,
                    courseId
                }
            });
            return enrollment;
        } catch (error) {
            console.log("====> Error enrollInCourse", error.message);
            throw new Error("Failed to enroll in course");
        }
    },

    getEnrollmentsByUserId: async (userId) => {
        try {
            const enrollments = await prisma.enrollment.findMany({
                where: { userId },
                include: {
                    course: {
                        include: {
                            sessions: true,
                        }
                    }
                }
            });
            return enrollments;
        } catch (error) {
            console.log("====> Error getEnrollmentsByUserId", error.message);
            throw new Error("Failed to fetch enrollments");
        }
    },
    getEnrollmentsByCourseId: async (courseId) => {
        try {
            const enrollments = await prisma.enrollment.findMany({
                where: { courseId },
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true
                        }
                    }
                }
            });
            return enrollments;
        } catch (error) {
            console.log("====> Error getEnrollmentsByCourseId", error.message);
            throw new Error("Failed to fetch enrollments");
        }
    },
    getEnrollmentDataByUserIdAndCourseId: async (userId, courseId) => {
        try {
            const enrollmentData = await prisma.enrollment.findFirst({
                where: {
                    userId,
                    courseId
                },
                include: {
                    course: {
                        include: {
                            sessions: {
                                include: {
                                    lectures: {
                                        include: {
                                            completedLecture: {
                                                where: {
                                                    userId
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
            return enrollmentData
        } catch (error) {
            throw new Error("Failed to fetch enrollmentData ")
        }
    }
}

export default enrollmentService;