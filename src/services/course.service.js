import prisma from "../configs/prisma.config.js"
import { CustomError, httpStatusCodes } from "../constants/constants.js";
import paginate from "../helpers/pagination.js";
import categoryService from "./category.service.js";

const courseService = {
    createCourse: async(courseData) =>{
        try {

            
            let category = await categoryService.getCategoryByName(courseData.category);
            if (!category) {
                category = await categoryService.createCategory(courseData.category);
            }
            courseData.categoryId = category.id;
            delete courseData.category;
            const course = await prisma.course.create({
                data: {
                    ...courseData
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
                    },
                    category: true,
                }
            });
            return course;
        } catch (error) {
            throw new CustomError(httpStatusCodes["Bad Request"], error.message)
        }
    },

     getCourseById:async (courseId)=> {
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
                    },
                    enrollments: true,
                    category: true,
                }
            });
            return course;
        } catch (error) {
            throw new CustomError(httpStatusCodes["Bad Request"], error.message)
        }
    },

    getAllCourses: async (conditions = {}, paginationData = {})=> {
        try {
            const courses = await paginate(prisma.course, {
                where: { ...conditions },
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
                    category: true,
                }
            },
                paginationData);
            return courses;
        } catch (error) {
            throw new CustomError(httpStatusCodes["Bad Request"], error.message)
        }
    },

    updateCourse: async (courseId, courseData) => {
        
        try {
            let category = await categoryService.getCategoryByName(courseData.category);
            if (!category) {
                category = await categoryService.createCategory(courseData.category);
            }
            courseData.categoryId = category.id;
            delete courseData.category;
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
                    },
                    category: true,
                }
            });
            return course;
        } catch (error) {
            throw new CustomError(httpStatusCodes["Bad Request"], error.message)
        }
    },

    deleteCourse: async (courseId) =>{
        try {
            await prisma.course.delete({
                where: { id: courseId }
            });
            return { message: 'Course deleted successfully' };
        } catch (error) {
            throw new CustomError(httpStatusCodes["Bad Request"], error.message)
        }
    },

    getCoursesByInstructor: async (instructorId) =>{
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
                    },
                    category: true,
                }
            });
            return courses;
        } catch (error) {
            throw new CustomError(httpStatusCodes["Bad Request"], error.message)
        }
    }
}

export default courseService;
