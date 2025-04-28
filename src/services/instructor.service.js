import prisma from "../configs/prisma.config.js"
import { CustomError, httpStatusCodes } from "../constants/constants.js"

const instructorService = {
    createInstructorProfile: async (userId) => {
        try {
            const instructorProfile = await prisma.instructorProfile.create({
                data: {
                    userId,
                    bio: "",
                    expertise: "",
                    socialLinks: {}
                },
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true
                        }
                    }
                }
            });
            return instructorProfile;
        } catch (error) {
            console.log("====> Error createInstructorProfile", error.message)
            throw new CustomError(httpStatusCodes["Bad Request"], error.message)
        }
    },

    getInstructorProfile: async (userId) => {
        try {
            const instructorProfile = await prisma.instructorProfile.findUnique({
                where: { userId },
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true
                        }
                    }
                }
            });
            return instructorProfile;
        } catch (error) {
            console.log("====> Error getInstructorProfile", error.message)
            throw new CustomError(httpStatusCodes["Bad Request"], error.message)
        }
    }
}

export default instructorService;