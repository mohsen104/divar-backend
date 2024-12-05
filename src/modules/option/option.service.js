import { OptionModel } from "./option.model.js";
import { CategoryModel } from "../category/category.model.js";
import createHttpError from 'http-errors';
import OptionMessage from "./option.message.js";
import slugify from "slugify";
import { isFalse, isTrue } from "../../common/utils/functions.js";
import { isValidObjectId } from "mongoose";

export const createService = async (optionDto) => {
    const category = await CategoryModel.findById(optionDto.category);
    if (!category) throw new createHttpError.NotFound(OptionMessage.NotFound);

    optionDto.category = category._id;

    optionDto.key = slugify(optionDto.key, { trim: true, replacement: "_", lower: true });

    const isExist = await OptionModel.findById(category._id);
    if (isExist) throw new createHttpError.Conflict(OptionMessage.AlreadyExist);

    if (optionDto?.enum && typeof optionDto?.enum === "sting") {
        optionDto.enum = optionDto.enum.split(",")
    } else if (!Array.isArray(optionDto.enum)) optionDto.enum = [];

    if (isTrue(optionDto?.required)) optionDto.required = true;
    if (isFalse(optionDto?.required)) optionDto.required = false;

    const option = await OptionModel.create(optionDto);
    return option;
}

export const updateService = async (id, optionDto) => {
    const existOption = await OptionModel.findById(id);
    if (!existOption) throw new createHttpError.NotFound(OptionMessage.NotFound);
    if (optionDto.category && isValidObjectId(optionDto.category)) {
        const category = await CategoryModel.findById(optionDto.category);
        if (!category) throw new createHttpError.NotFound(OptionMessage.NotFound);
        optionDto.category = category._id;
    } else {
        delete optionDto.category;
    }
    if (optionDto.slug) {
        optionDto.key = slugify(optionDto.key, { trim: true, replacement: "_", lower: true });
        let categoryId = existOption.category;
        if (optionDto.category) categoryId = optionDto.category;
        const isExist = await OptionModel.findById(categoryId);
        if (isExist) throw new createHttpError.Conflict(OptionMessage.AlreadyExist);
    }
    if (optionDto?.list && typeof optionDto.list === "string") {
        optionDto.list = optionDto.list.split(",")
    } else if (!Array.isArray(optionDto.list)) optionDto.list = [];

    if (isTrue(optionDto?.required)) optionDto.required = true;
    else if (isFalse(optionDto?.required)) optionDto.required = false;
    else delete optionDto?.required

    return await OptionModel.updateOne({ _id: id }, { $set: optionDto });
}

export const findService = async () => {
    const options = await OptionModel.find({}, { __v: 0 }, { sort: { _id: -1 } }).populate([{ path: "category", select: { name: 1, slug: 1 } }]);
    return options;
}

export const findByIdService = async (id) => {
    const option = await OptionModel.findById(id);
    if (!option) throw new createHttpError.NotFound(OptionMessage.NotFound);
    return option;
}

export const findByCategoryIdService = async (categoryId) => {
    const options = await OptionModel.find({ category: categoryId }, { __v: 0 }).populate([{ path: "category", select: { name: 1, slug: 1 } }]);
    return options;
}

export const findByCategorySlugService = async (slug) => {
    const options = await OptionModel.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $unwind: "$category"
        },
        {
            $addFields: {
                categorySlug: "$category.slug",
                categoryName: "$category.name",
                categoryIcon: "$category.icon"
            }
        },
        {
            $project: {
                category: 0,
                __v: 0
                // "category.parent": 0,
            }
        },
        {
            $match: {
                categorySlug: slug
            }
        }
    ])
    return options;
}

export const removeByIdService = async (id) => {
    const option = await OptionModel.findById(id);
    if (!option) throw new createHttpError.NotFound(OptionMessage.NotFound);
    return await OptionModel.deleteOne({ _id: id })
}