import prisma from "../configs/prisma.config.js"


const reviewService = {
    createReview: async (data) => {
        try {
            const review = await prisma.courseReview.create({
                data: {
                    ...data
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                },
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

    getAverageRating: async (courseId) => { 
        try {
            const result = await prisma.courseReview.aggregate({
                where: {
                    courseId
                },
                _avg: {
                    rating: true
                }
            })
            return result._avg.rating || 0;
        } catch (error) {
            console.log("====> Error getAverageRating", error.message);
            throw new Error("Failed to get average rating");
        }
    }
}

export default reviewService;