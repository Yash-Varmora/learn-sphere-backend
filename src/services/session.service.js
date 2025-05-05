import prisma from '../configs/prisma.config.js';

const sessionService = {
    createSession: async (sessionData) => {
        try {
            const session = await prisma.session.create({
                data: sessionData,
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
                    },
                }
            });
            return session;
        } catch (error) {
            throw error;
        }
    },

    getSessionById: async (id) => {
        try {
            const session = await prisma.session.findUnique({
                where: { id },
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
                    },
                    lectures: {
                        orderBy: {
                            createdAt: "asc"
                        }
                    }
                }
            });
            return session;
        } catch (error) {
            throw error;
        }
    },

    getSessionsByCourseId: async (courseId) => {
        try {
            const sessions = await prisma.session.findMany({
                where: { courseId },
                include: {
                    course:true,
                    lectures: {
                        
                        orderBy: {
                            createdAt: "asc"
                        }
                    }
                }
            });
            return sessions;
        } catch (error) {
            throw error;
        }
    },

    updateSession: async (id, sessionData) => {
        try {
            const session = await prisma.session.update({
                where: { id },
                data: sessionData,
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
            });
            return session;
        } catch (error) {
            throw error;
        }
    },

    deleteSession: async (id) => {
        try {
            await prisma.session.delete({
                where: { id }
            });
            return { message: 'Session deleted successfully' };
        } catch (error) {
            throw error;
        }
    }
}

export default sessionService; 