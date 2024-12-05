import { CookieNames } from "../../common/constants/cookie.enum.js";
import { NodeEnv } from "../../common/constants/env.enum.js";
import AuthMessage from "./auth.message.js";
import { checkOTPService, sendOTPService } from "./auth.service.js";
import dotenv from 'dotenv';
dotenv.config();

export const sendOTP = async (req, res, next) => {
    try {
        const { mobile } = req.body;
        await sendOTPService(mobile);
        return res.json({
            message: AuthMessage.SendOtpSuccessfully
        })
    } catch (error) {
        next(error);
    }
}

export const checkOTP = async (req, res, next) => {
    try {
        const { mobile, code } = req.body;
        const token = await checkOTPService(mobile, code);
        return res.cookie(CookieNames.AccessToken, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === NodeEnv.Production,
        }).status(200).json({
            message: AuthMessage.LoginSuccessfully,
            token
        })
    } catch (error) {
        next(error);
    }
}

export const logout = async (req, res, next) => {
    try {
        return res.clearCookie(CookieNames.AccessToken).status(200).json({
            message: AuthMessage.LogoutSuccessfully
        })
    } catch (error) {
        next(error);
    }
}