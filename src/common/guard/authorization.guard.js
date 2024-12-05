import createHttpError from 'http-errors';
import AuthorizationMessage from '../messages/auth.message.js';
import jwt from 'jsonwebtoken';
import { UserModel } from '../../modules/user/user.model.js'
import dotenv from 'dotenv';
dotenv.config();

const Authorization = async (req, res, next) => {
    try {
        const token = req?.cookies?.access_token;
        if (!token) throw new createHttpError.Unauthorized(AuthorizationMessage.Login);
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (data?.id) {
            const user = await UserModel.findById(data.id, { otp: 0, updatedAt: 0, __v: 0, verifiedMobile: 0 }).lean();
            if (!user) throw new createHttpError.Unauthorized(AuthorizationMessage.NotFoundAccount);
            req.user = user;
            return next();
        }
        throw new createHttpError.Unauthorized(AuthorizationMessage.InvalidToken)
    } catch (error) {
        next(error)
    }
}

export default Authorization