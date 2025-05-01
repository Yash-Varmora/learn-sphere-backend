import prisma from "../configs/prisma.config";

const lectureService = {
    createLecture: async (lectureData) => {
        try {
            const lecture = await prisma.lecture.create({
                data: lectureData,
                include: {
                    session: {
                        include: {
                            course: {
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
                            }
                        }
                    },
                }
            })
        } catch (error) {

        }
    },

    getLectureById: async (id) => {
        try {
            const lecture = await prisma.lecture.findUnique({
                where: { id },
                include: {
                    session: {
                        include: {
                            course: {
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
                            }
                        }
                    },
                }
            })
            return lecture;
        } catch (error) {
            throw error;
        }
    },
    getLectureBySessionId: async (sessionId) => {
        try {
            const lectures = await prisma.lecture.findMany({
                where: { sessionId }
            })
            return lectures;
        } catch (error) {
            throw error;
        }
    },
    updateLecture: async (id, lectureData) => {
        try {
            const lecture = await prisma.lecture.update({
                where: { id },
                data: lectureData,
                include: {
                    session: {
                        include: {
                            course: {
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
                            }
                        }
                    },
                }
            })
            return lecture;
        } catch (error) {
            throw error;
        }
    },
    deleteLecture: async (id) => {
        try {
            const lecture = await prisma.lecture.delete({
                where: { id }
            })
            return {message: "Delete lecture successfully"};
        } catch (error) {
            throw error;
        }
    }
}
export default lectureService;