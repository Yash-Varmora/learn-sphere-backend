import bcrypt from "bcryptjs"

import config from "../constants/config.js"
import { CustomError, httpStatusCodes } from "../constants/constants.js"


export const encryptPassword = async (password) => {
    const encPassword = await bcrypt.hash(password, parseInt(config.SALT_ROUNDS))
    return encPassword
}

export const comparePassword = async (password, userPassword) => {
    try {
        return await bcrypt.compare(password, userPassword)
    } catch (error) {
        console.log("====> Error comparePassword", error.message)
        throw new CustomError(httpStatusCodes["Bad Request"], error.message)
    }
}