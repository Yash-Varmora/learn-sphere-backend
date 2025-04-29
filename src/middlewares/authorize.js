import { CustomError, httpStatusCodes } from "../constants/constants.js"
import instructorService from "../services/instructor.service.js"

const authorizeInstructor = async (req, res, next) => {
    try {
        const { user } = req

        if (!user || !user.isInstructor) {
            throw new CustomError(httpStatusCodes["Unauthorized"], "You are not authorized to access this resource")
        }
        const instructorProfile = await instructorService.getInstructorProfile(user.id)
        req.user = {
            ...user,
            instructorProfile
        }
        next()
    } catch (error) {
        console.log("====> Error authorizeInstructor", error.message)
        throw new CustomError(httpStatusCodes["Unauthorized"], error.message)
    }
}

export default authorizeInstructor;