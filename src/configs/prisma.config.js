import { PrismaClient } from "../../generated/prisma/client.js";


const prisma = new PrismaClient()

export const connectDB = async () => {
    try {
        await prisma.$connect()
        console.log("Connected to the database successfully!")
    } catch (error) {
        console.log("Failed to connect to the database:", error)
        process.exit(1)
    }
}

export default prisma;