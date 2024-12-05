import createHttpError from 'http-errors';
import { UserModel } from '../user/user.model.js';
import AuthMessage from './auth.message.js';
import { randomInt } from "crypto";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const sendOTPService = async (mobile) => {
    const user = await UserModel.findOne({ mobile });
    const now = new Date().getTime();
    const otp = {
        code: randomInt(10000, 99999),
        expiresIn: now + (1000 * 60 * 2),
    }
    if (!user) {
        const newUser = await UserModel.create({ mobile, otp });
        return newUser;
    }
    if (user.otp && user.otp.expiresIn > now) {
        if (!user) throw new createHttpError.BadRequest(AuthMessage.OtpCodeNotExpired);
    }
    user.otp = otp;
    await user.save();
    return user;
}

export const checkOTPService = async (mobile, code) => {
    const user = await UserModel.findOne({ mobile });
    const now = new Date().getTime();
    if (!user) throw new createHttpError.NotFound(AuthMessage.NotFound);
    if (user?.otp?.expiresIn < now) throw new createHttpError.Unauthorized(AuthMessage.OtpCodeExpired);
    if (user?.otp?.code !== code) throw new createHttpError.Unauthorized(AuthMessage.OtpCodeIsIncorrect);
    if (!user.verifiedMobile) {
        user.verifiedMobile = true;
    }
    const accessToken = signToken({ mobile, id: user._id });
    await user.save();
    return accessToken;
}

const signToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1y" })
}