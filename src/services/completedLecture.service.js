import prisma from "../configs/prisma.config.js";

const completedLectureService = {
    markLectureAsCompleted: async (userId, lectureId) => {
        try {
            const completedLecture = await prisma.completedLecture.create({
                data: {
                    userId,
                    lectureId
                },
                select: {
                    lectureId: true,
                }
            });
            return completedLecture;
        } catch (error) {
            throw error;
        }
    },
    getComputedLecturesByUserId: async (userId) => { 
        try {
            const completedLectures = await prisma.completedLecture.findMany({
                where: { userId },
                select: {
                    lectureId: true,
                }
            });
            return completedLectures;
        } catch (error) {
            throw error;
        }
    },
}

export default completedLectureService;