import { CustomError, httpStatusCodes } from "../constants/constants.js"
import token from "../helpers/handleToken.js"
import userService from "../services/user.service.js"


const authMiddleware = async (req, res, next) => {
    try {
        const { access_token: accessToken, refresh_token: refreshToken } = req.cookies
        if (!accessToken && !refreshToken) {
            throw new CustomError(httpStatusCodes["Unauthorized"], "Invalid Access")
        }
        const decodedData = token.verifyAccessToken(accessToken)
        const userData = await userService.fetchUser({ email: decodedData.data.email })
        const { password, ...user } = userData
        if (!user) {
            throw new CustomError(httpStatusCodes["Unauthorized"], "Invalid Access")
        }
        await token.verifyRefreshToken(refreshToken, { user })
        req.user = user
        return next()
    } catch (error) {
        console.log("====> Error authMiddleware", error.message)
        throw new CustomError(httpStatusCodes["Unauthorized"], error.message)
    }
}

export default authMiddleware;