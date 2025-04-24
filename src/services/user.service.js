import prisma from "../configs/prisma.config.js"
import { CustomError, httpStatusCodes } from "../constants/constants.js"
import paginate from "../helpers/pagination.js"



const userService = {

    createUser: async (data) => {
        try {
            const user = await prisma.user.create({
                data: {
                    ...data
                }
            })
            const { password, ...newUser } = user
            return newUser
        } catch (error) {
            console.log("====> Error createUser", error.message)
            throw new CustomError(httpStatusCodes["Bad Request"], error.message)
        }
    },

    fetchUser: async (conditions) => {
        try {
            const data = await prisma.user.findUnique({
                where: {
                    ...conditions
                }
            })
            return data
        } catch (error) {
            console.log("====> Error fetchUser", error.message)
            throw new CustomError(httpStatusCodes["Bad Request"], error.message)
        }
    },

    fetchUsers: async (conditions = {}, paginationData = {}) => {
        try {
            const result = await paginate(prisma.user, {
                where: { ...conditions },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }, paginationData);
            if (!result.data.length) {
                throw new CustomError(httpStatusCodes["Bad Request"], "No data found")
            }
            return {
                users: result.data,
                count: result.total,
                page: result.page,
                totalPages: result.totalPages,
            }
        } catch (error) {
            console.log("====> Error fetchUsers", error.message)
            throw new CustomError(httpStatusCodes["Bad Request"], error.message)
        }
    },

    modifyUser: async (conditions, updatedValue) => { 
        try {
            const data = await prisma.user.update({
                where: {
                    ...conditions
                },
                data: {
                    ...updatedValue
                }
            })
            if (!data) {
                throw new CustomError(httpStatusCodes["Bad Request"], "Invalid Data")
            }
            const { password, ...user } = data
            return user
        } catch (error) {
            console.log("====> Error modifyUser", error.message)
            throw new CustomError(httpStatusCodes["Bad Request"], error.message)
        }
    },

    deleteUser: async (conditions) => { 
        try {
            const data = await prisma.user.delete({
                where: {
                    ...conditions
                }
            })
            if (!data) {
                throw new CustomError(httpStatusCodes["Bad Request"], "Invalid Data")
            }
            return data
        } catch (error) {
            console.log("====> Error deleteUser", error.message)
            throw new CustomError(httpStatusCodes["Bad Request"], error.message)
        }
    }
}

export default userService