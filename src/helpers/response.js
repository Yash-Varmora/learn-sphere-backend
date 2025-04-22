import { httpStatusCodes, responseStatus } from "../constants/constants"


export const sendResponse = (res, statuscode, status, operation, data = {}) => {
    return res.status(statuscode).json({
        status,
        statuscode,
        operation,
        data
    })
}

export const errResponse = (res, req, res, next) => {
    return res.status(err.status || httpStatusCodes["Internal Server Error"]).json({
        status: responseStatus.ERROR,
        statuscode: err.status || httpStatusCodes["Internal Server Error"],
        message: err.message || "Server Error"
    })
}