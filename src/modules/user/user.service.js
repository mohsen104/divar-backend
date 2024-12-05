import createHttpError from 'http-errors';
import { UserModel } from '../user/user.model.js';
import AuthMessage from './auth.message.js';
import { randomInt } from "crypto";
import jwt from 'jsonwebtoken';

export const whoamiService = async () => {
}