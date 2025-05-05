import prisma from "../configs/prisma.config.js"


const reviewService = {
    createReview: async (data) => {
        try {
            const review = await prisma.courseReview.create({
                data: {
                    ...data
                }
            })
            return review
        } catch (error) {
            console.log("====> Error createReview", error.message);
            throw new Error("Failed to create review");
        }
    },

    getCourseReviews: async (courseId) => {
        try {
            const reviews = await prisma.courseReview.findMany({
                where: {
                    courseId
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                },
                orderBy: { createdAt: "desc" },
            })
            return reviews
        } catch (error) {
            console.log("====>  Error getCourseReviews", error.message);
            throw new Error("Failed to get course reviews");
        }

    },
}

export default reviewService;