import { CustomError, httpStatusCodes, responseStatus } from "../../constants/constants.js"
import { encryptPassword } from "../../helpers/encryptPassword.js"
import { sendResponse } from "../../helpers/response.js"
import userService from "../../services/user.service.js"


const getUsers = async (req, res, next) => {
    try {
        const { page, limit } = req.query
        const conditions = req.query
        delete conditions.page
        delete conditions.limit
        const users = await userService.fetchUsers(conditions, { page, limit })
        return sendResponse(res, httpStatusCodes["OK"], responseStatus.SUCCESS, "Get users successfully", users)
    } catch (error) {
        console.log("====> Error getUsers", error.message)
        return next(error)
    }
}

const getUserByID = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userData = await userService.fetchUser({ id })
        if(!userData) {
            return next(new CustomError(httpStatusCodes["Not Found"], "User not found"))
        }
        const { password, ...user } = userData
        return sendResponse(res, httpStatusCodes["OK"], responseStatus.SUCCESS, "Get user successfully", user)
    } catch (error) {
        console.log("====> Error getUserByID", error.message)
        return next(error)
    }
}

const addUser = async (req, res, next) => {
    try {
        const data = { ...req.body, ...req.validatedData };
        if (await userService.fetchUser({email:data.email}, )) {
            return next(new CustomError(httpStatusCodes["Bad Request"], "User already exists"))
        }
        data.password = await encryptPassword(data.password)
        const user = await userService.createUser(data)
        return sendResponse(res, httpStatusCodes["Created"], responseStatus.SUCCESS, "Create user successfully", user)
    } catch (error) {
        console.log("====> Error addUser", error.message)
        console.log(error)
        return next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const data = { ...req.body, ...req.validatedData };
        const id = data.id;
        delete data.id;
        const { password } = data
        const updatedData = password ? { ...data, password: await encryptPassword(password) } : data
        const user = await userService.modifyUser({id}, updatedData)
        return sendResponse(res, httpStatusCodes["OK"], responseStatus.SUCCESS, "Update user successfully", user)
    } catch (error) {
        console.log("====> Error updateUser", error.message)
        return next(error)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const users = await userService.deleteUser({id});
        return sendResponse(res, httpStatusCodes["OK"], responseStatus.SUCCESS, "Delete user successfully", users)
    } catch (error) {
        console.log("====> Error deleteUser", error.message)
        return next(error)
    }
}

const getUserMe = async (req, res, next) => {
    try {
        const id = req.user.id;
        const userData = await userService.fetchUser({ id })
        const { password, ...user } = userData
        return sendResponse(res, httpStatusCodes["OK"], responseStatus.SUCCESS, "Get user me successfully", user)
    } catch (error) {
        console.log("====> Error getUserMe", error.message)
        return next(error)
    }
}

const updateUserMe = async (req, res, next) => {
    try {
        const id = req.user.id;
        const data = { ...req.body, ...req.validatedData };
        delete data.isInstructor
        delete data.email
        const { password } = data;
        const updatedData = password ? { ...data, password: await encryptPassword(password) } : data;
        const user = await userService.modifyUser({id}, updatedData);
        return sendResponse(res, httpStatusCodes["OK"], responseStatus.SUCCESS, "Update user me successfully", user)
    } catch (error) {
        console.log(error)
        console.log("====> Error updateUserMe", error.message)
        return next(error)
    }
}
export default {
    getUsers,
    getUserByID,
    addUser,
    updateUser,
    deleteUser,
    getUserMe,
    updateUserMe
}