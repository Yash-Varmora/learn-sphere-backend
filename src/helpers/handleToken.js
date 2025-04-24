import jwt from "jsonwebtoken"

import config from "../constants/config.js"
import tokenService from "../services/token.service.js"
import {CustomError, httpStatusCodes } from "../constants/constants.js"


const genJWT = (data, tokenSecret, tokenExpire) => {
    try {
        const token = jwt.sign({ data }, tokenSecret, { expiresIn: tokenExpire })
        return token
    } catch (error) {
        console.log("====> Error genJWT", error.message)
        throw new CustomError(httpStatusCodes["Bad Request"], error.message)
    }
}

const verifyJWT = (token, tokenSecret) => {
    try {
        const decodedData = jwt.verify(token, tokenSecret);
        return decodedData
    } catch (error) {
        console.log("====> Error verifyJWT", error.message)
        throw new CustomError(httpStatusCodes["Unauthorized"], error.message)
    }
}

const token = {
    genAccessToken: (user) => {
        try {
            const token = genJWT(user, config.ACCESS_TOKEN_SECRET, config.ACCESS_TOKEN_EXPIRES)
            return token
        } catch (error) {
            console.log("====> Error genAccessToken", error.message)
            throw new CustomError(httpStatusCodes["Bad Request"], error.message)
        }
    },

    genRefreshToken: async(user) => {
        try {
            const token = genJWT(user, config.REFRESH_TOKEN_SECRET, config.REFRESH_TOKEN_EXPIRES)
            await tokenService.createToken({userId: user.id, token})
            return token
        } catch (error) {
            console.log("====> Error genRefreshToken", error.message)
            throw new CustomError(httpStatusCodes["Bad Request"], error.message)
        }
    },

    verifyAccessToken: (token) => { 
        try {
            const decodedData = verifyJWT(token, config.ACCESS_TOKEN_SECRET)
            return decodedData
        } catch (error) {
            console.log("====> Error verifyAccessToken", error.message)
            throw new CustomError(httpStatusCodes["Unauthorized"], error.message)
        }
    },

    verifyRefreshToken: async (token, optional = {}) => { 
        try {
            const { user = {}, isAuth = true } = optional
            const decodedData = verifyJWT(token, config.REFRESH_TOKEN_SECRET)
            if (isAuth && decodedData.data.id !== user.id) {
                throw new CustomError(httpStatusCodes["Unauthorized"], "Invalid User")
            }
            const { refreshToken } = await tokenService.fetchToken({ userId: decodedData.data.id })
            if (refreshToken !== token) {
                await tokenService.removeToken({ userId: user.id })
                throw new CustomError(httpStatusCodes["Unauthorized"], "Invalid Token")
            }
            return decodedData
        } catch (error) {
            console.log("====> Error verifyRefreshToken", error.message)
            throw new CustomError(httpStatusCodes["Unauthorized"], error.message)
        }
    }
}

export default token;