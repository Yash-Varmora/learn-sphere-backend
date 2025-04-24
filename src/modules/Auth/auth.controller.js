import config from "../../constants/config.js"
import { CustomError, httpStatusCodes, responseStatus } from "../../constants/constants.js"
import { comparePassword } from "../../helpers/encryptPassword.js"
import token from "../../helpers/handleToken.js"
import { sendResponse } from "../../helpers/response.js"
import tokenService from "../../services/token.service.js"
import userService from "../../services/user.service.js"



const login = async (req, res, next) => {
    try {
        res.clearCookie("access_token")
        res.clearCookie("refresh_token")
        const data = { ...req.body, ...req.validatedData }
        const { email, password } = data;
        const userData = await userService.fetchUser({ email })
        if (!userData || !(await comparePassword(password, userData.password))) {
            throw new CustomError(httpStatusCodes["Bad Request"], "Invalid data")
        }
        const { password: _, ...user } = userData
        const accessToken = token.genAccessToken(user)
        const refreshToken = await token.genRefreshToken(user)

        res.cookie("access_token", accessToken, {
            expires: new Date(Date.now() + 60 * 1000 * config.ACCESS_TOKEN_COOKIE_EXPIRE_TIME),
            httpOnly: true
        })
        res.cookie("refresh_token", refreshToken, {
            expires: new Date(Date.now() + 60 * 1000 * config.REFRESH_TOKEN_COOKIE_EXPIRE_TIME),
            httpOnly: true
        })

        return sendResponse(res, httpStatusCodes["OK"], responseStatus.SUCCESS, "Login Successfully", user)
    } catch (error) {
        console.log("====> Error login", error.message)
        return next(error)
    }
}

const refreshToken = async (req, res, next) => {
    try {
        let { refresh_token: refreshToken } = req.cookies
        if (!refreshToken) {
            throw new CustomError(httpStatusCodes["Unauthorized"], "Invalid access")
        }

        res.clearCookie("refresh_token")
        res.clearCookie("access_token")

        const decodedData = await token.verifyRefreshToken(refreshToken, { isAuth: false })
        const userData = await userService.fetchUser({ id: decodedData.data.id })
        const { password, ...user } = userData
        if (!user) {
            throw new CustomError(httpStatusCodes["Unauthorized"], "Invalid access")
        }

        const accessToken = token.genAccessToken(user)
        refreshToken = await token.genRefreshToken(user)
        res.cookie("access_token", accessToken, {
            expires: new Date(Date.now() + 60 * 1000 * config.ACCESS_TOKEN_COOKIE_EXPIRE_TIME),
            httpOnly: true
        })
        res.cookie("refresh_token", refreshToken, {
            expires: new Date(Date.now() + 60 * 1000 * config.REFRESH_TOKEN_COOKIE_EXPIRE_TIME),
            httpOnly: true
        })
        return sendResponse(res, httpStatusCodes["OK"], responseStatus.SUCCESS, "Set refresh_token and access_token successfully")
    } catch (error) {
        console.log("====> Error refreshToken", error.message)
        return next(error)
    }
}

const logout = async (req, res, next) => {
    try {
        const { refresh_token: refreshToken } = req.cookies
        res.clearCookie("access_token")
        res.clearCookie("refresh_token")
        await tokenService.removeToken({ refreshToken })
        return sendResponse(res, httpStatusCodes["OK"], responseStatus.SUCCESS, "logout in successfully")
    } catch (error) {
        console.log("====> Error logout", error.message)
        return next(error)
    }
}

export default {
    login,
    refreshToken,
    logout
}