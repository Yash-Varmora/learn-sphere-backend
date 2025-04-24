import prisma from "../configs/prisma.config.js"
import { CustomError, httpStatusCodes } from "../constants/constants.js"


const tokenService = {
    createToken: async (data) => {
        try {
            const { userId, token } = data
            await prisma.refreshToken.upsert({
                where: {
                    userId
                },
                update: {
                    refreshToken: token
                },
                create: {
                    userId,
                    refreshToken: token
                },
            })
        } catch (error) {
            console.log("====> Error createToken", error.message)
            throw new CustomError(httpStatusCodes["Bad Request"], error.message)
        }
    },

    fetchToken: async (conditions) => {
        try {
            const data = await prisma.refreshToken.findUnique({
                where: {
                    ...conditions
                }
            })
            if (!data) {
                throw new CustomError(httpStatusCodes["Bad Request"], "Invalid Tokens")
            }
            return data
        } catch (error) {
            console.log("====> Error fetchToken", error.message)
            throw new CustomError(httpStatusCodes["Bad Request"], error.message)
        }
    },

    removeToken: async (conditions) => { 
        try {
            const data = await prisma.refreshToken.delete({
                where: {
                    ...conditions
                }
            })
            if (!data) {
                throw new CustomError(httpStatusCodes["Bad Request"], "Invalid Tokens")
            }
            return data 
        } catch (error) {
            console.log("====> Error removeToken", error.message)
            throw new CustomError(httpStatusCodes["Bad Request"], error.message)
        }
    }
}

export default tokenService