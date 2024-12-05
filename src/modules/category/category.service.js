import { isValidObjectId, Types } from "mongoose";
import { CategoryModel } from "./category.model.js";
import { OptionModel } from "../option/option.model.js";
import createHttpError from 'http-errors';
import CategoryMessage from "./category.message.js";
import slugify from "slugify";

export const createService = async (categoryDto) => {
    if (categoryDto?.parent && isValidObjectId(categoryDto.parent)) {
        const existCategory = await CategoryModel.findById(categoryDto.parent);
        if (!existCategory) throw new createHttpError.NotFound(CategoryMessage.NotFound);
        categoryDto.parent = existCategory._id
        categoryDto.parents = [
            ... new Set(
                ([existCategory._id.toString()].concat(
                    existCategory.parents.map(id => id.toString())
                )).map(id => new Types.ObjectId(id))
            )
        ]
    }

    if (categoryDto?.slug) {
        categoryDto.slug = slugify(categoryDto.slug);
        const existSlug = await CategoryModel.findOne({ slug: categoryDto.slug });
        if (existSlug) throw new createHttpError.Conflict(CategoryMessage.AlreadyExist);
    } else {
        categoryDto.slug = slugify(categoryDto.name)
    }

    const category = CategoryModel.create(categoryDto);
    return category;
}

export const removeService = async (id) => {
    if (id && isValidObjectId(id)) {
        const existCategory = await CategoryModel.findById(categoryDto.parent);
        if (!existCategory) throw new createHttpError.NotFound(CategoryMessage.NotFound);
    }
    await OptionModel.deleteMany({ category: id }).then(async () => {
        await CategoryModel.deleteOne({ _id: id });
    })
    return true
}

export const findService = async () => {
    return CategoryModel.find({ parent: { $exists: false } });
}