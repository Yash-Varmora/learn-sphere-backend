import { OAuth2Client } from "google-auth-library";
import config from "../../constants/config.js";
import { CustomError, httpStatusCodes, responseStatus } from "../../constants/constants.js"
import userService from "../../services/user.service.js";
import token from "../../helpers/handleToken.js";
import { sendResponse } from "../../helpers/response.js";



const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res, next) => {
    try {
        const { tokenId } = req.body;

        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: config.GOOGLE_CLIENT_ID,
        });

        const { email_verified, name, email, sub } = ticket.getPayload();

        if (!email_verified) {
            throw new CustomError(httpStatusCodes["Bad Request", "Google email not verified"])
        }

        let userData = await userService.fetchUser({
            email
        })

        if (!userData) {
            userData = await userService.createUser({
              name, email, googleId:sub  
            })
        } else {
            if (!userData.googleId) {
                userData = await userService.modifyUser({id: userData.id}, {googleId: sub})
            }
        }
        const {password:_, ...user} = userData
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
        console.log(error)
        console.log("====> Error login", error.message)
        return next(error)
    }
}

export default googleLogin;