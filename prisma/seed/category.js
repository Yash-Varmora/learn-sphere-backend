import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();

const seedCategory = async () => {
    const categories = [
        'Web Development',
        'Backend Development',
        'Frontend Development',
        'Data Science',
        'Machine Learning',
        'Mobile Development',
        'UI/UX Design',
        'Cloud Computing',
    ];

    for (const name of categories) {
        await prisma.category.upsert({
            where: { name },
            update: {},
            create: { name },
        });
    }

    console.log('✅ Categories seeded successfully');
}

export default seedCategory;
