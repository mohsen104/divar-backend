import CategoryMessage from "./category.message.js";
import { createService, findService, removeService } from "./category.service.js";
import HttpCodes from 'http-status-codes';

export const create = async (req, res, next) => {
    try {
        const { name, icon, slug, parent } = req.body;
        await createService({ name, icon, slug, parent });
        return res.status(HttpCodes.CREATED).json({
            message: CategoryMessage.Created
        })
    } catch (error) {
        next(error);
    }
}

export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        await removeService(id);
        return res.status(HttpCodes.OK).json({
            message: CategoryMessage.Deleted
        })
    } catch (error) {
        next(error);
    }
}

export const find = async (req, res, next) => {
    try {
        const categories = await findService();
        await findService();
        return res.json({
            categories
        })
    } catch (error) {
        next(error);
    }
}