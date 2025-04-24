import { CustomError, httpStatusCodes } from "../constants/constants.js"


const authorizeInstructor = (req, res, next) => { 
    try {
        const { user } = req
        if (!user || user.isInstructor) {
            throw new CustomError(httpStatusCodes["Unauthorized"], "You are not authorized to access this resource")
        }
        next()
    } catch (error) {
        console.log("====> Error authorizeInstructor", error.message)
        throw new CustomError(httpStatusCodes["Unauthorized"], error.message)
    }
}

export default authorizeInstructor;