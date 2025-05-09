import { CustomError, httpStatusCodes } from "../constants/constants.js"


const validator = (schema) => {
    const validatorMiddleware = (req, res, next) => {
        try {
            let data
            data = schema.validate({ ...req.body, ...req.params })
            if (data.error) {
                throw new CustomError(httpStatusCodes["Bad Request"], data.error)
            }
            req.validatedData = data.value
            return next()
        } catch (error) {
            console.log("=====> Error validator", error.message)
            return next(error)
        }
    }
    return validatorMiddleware
}

export default validator