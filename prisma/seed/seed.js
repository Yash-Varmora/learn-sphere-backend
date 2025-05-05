import { PrismaClient } from "../../generated/prisma/client.js";
import seedCategory from "./category.js";

const prisma = new PrismaClient();

async function main() {
    await seedCategory()
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});