import OptionMessage from "./option.message.js";
import { createService, findByCategoryIdService, findByCategorySlugService, findByIdService, findService, removeByIdService, updateService } from "./option.service.js";
import HttpCodes from 'http-status-codes';

export const create = async (req, res, next) => {
    try {
        const { title, key, guid, enum: list, type, category, required } = req.body;
        await createService({ title, key, guid, enum: list, type, category, required });
        return res.status(HttpCodes.CREATED).json({
            message: OptionMessage.Created
        })
    } catch (error) {
        next(error);
    }
}

export const update = async (req, res, next) => {
    try {
        const { title, key, guid, enum: list, type, category, required } = req.body;
        const { id } = req.params;
        await updateService(id, { title, key, guid, enum: list, type, category, required });
        return res.status(HttpCodes.OK).json({
            message: OptionMessage.Updated
        })
    } catch (error) {
        next(error);
    }
}

export const find = async (req, res, next) => {
    try {
        const options = await findService();
        return res.json({
            options
        })
    } catch (error) {
        next(error);
    }
}

export const findById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const option = await findByIdService(id);
        return res.json({
            option
        })
    } catch (error) {
        next(error);
    }
}

export const findByCategoryId = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const options = await findByCategoryIdService(categoryId);
        return res.json({
            message: OptionMessage.Created,
            options
        })
    } catch (error) {
        next(error);
    }
}

export const findByCategorySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const options = await findByCategorySlugService(slug);
        return res.json({
            options
        })
    } catch (error) {
        next(error);
    }
}

export const removeById = async (req, res, next) => {
    try {
        const { id } = req.params;
        await removeByIdService(id);
        return res.json({
            message: OptionMessage.Deleted,
        })
    } catch (error) {
        next(error);
    }
}