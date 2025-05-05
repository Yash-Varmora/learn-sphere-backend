import prisma from "../configs/prisma.config.js";

const categoryService = {
    createCategory: async (name) => {
        try {
            const category = await prisma.category.create({
                data: { name },
            });
            return category;
        } catch (error) {
            console.log("====> Error createCategory", error.message);
            throw new Error("Failed to create category");
        }
    },
    getAllCategories: async () => {
        try {
            const categories = await prisma.category.findMany();
            return categories;
        } catch (error) {
            console.log("====> Error getAllCategories", error.message);
            throw new Error("Failed to fetch categories");
        }
    },
    getCategoryByName: async (name) => {
        try {
            const category = await prisma.category.findUnique({
                where: { name },
            });
            return category;
        } catch (error) {
            console.log("====> Error getCategoryByName", error.message);
            throw new Error("Failed to fetch category");
        }
    },
}

export default categoryService;