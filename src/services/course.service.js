import prisma from "../configs/prisma.config.js"
import { CustomError, httpStatusCodes } from "../constants/constants.js";


class CourseService {
    async createCourse(courseData) {
        try {
            const course = await prisma.course.create({
                data: {
                    ...courseData,
                    instructorId: courseData.instructorId
                },
                include: {
                    instructor: {
                        include: {
                            user: {
                                select: {
                                    name: true,
                                    email: true
                                }
                            }
                        }
                    }
                }
            });
            return course;
        } catch (error) {
            throw new CustomError(httpStatusCodes["Bad Request"], error.message)
        }
    }

    async getCourseById(courseId) {
        try {
            const course = await prisma.course.findUnique({
                where: { id: courseId },
                include: {
                    instructor: {
                        include: {
                            user: {
                                select: {
                                    name: true,
                                    email: true
                                }
                            }
                        }
                    },
                    sessions: {
                        include: {
                            lectures: true
                        }
                    }
                }
            });
            return course;
        } catch (error) {
            throw new CustomError(httpStatusCodes["Bad Request"], error.message)
        }
    }

    async getAllCourses() {
        try {
            const courses = await prisma.course.findMany({
                include: {
                    instructor: {
                        include: {
                            user: {
                                select: {
                                    name: true,
                                    email: true
                                }
                            }
                        }
                    }
                }
            });
            return courses;
        } catch (error) {
            throw new CustomError(httpStatusCodes["Bad Request"], error.message)
        }
    }

    async updateCourse(courseId, courseData) {
        try {
            const course = await prisma.course.update({
                where: { id: courseId },
                data: courseData,
                include: {
                    instructor: {
                        include: {
                            user: {
                                select: {
                                    name: true,
                                    email: true
                                }
                            }
                        }
                    }
                }
            });
            return course;
        } catch (error) {
            throw new CustomError(httpStatusCodes["Bad Request"], error.message)
        }
    }

    async deleteCourse(courseId) {
        try {
            await prisma.course.delete({
                where: { id: courseId }
            });
            return { message: 'Course deleted successfully' };
        } catch (error) {
            throw new CustomError(httpStatusCodes["Bad Request"], error.message)
        }
    }

    async getCoursesByInstructor(instructorId) {
        try {
            const courses = await prisma.course.findMany({
                where: { instructorId },
                include: {
                    instructor: {
                        include: {
                            user: {
                                select: {
                                    name: true,
                                    email: true
                                }
                            }
                        }
                    }
                }
            });
            return courses;
        } catch (error) {
            throw new CustomError(httpStatusCodes["Bad Request"], error.message)
        }
    }
}

export default new CourseService();
