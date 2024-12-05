import PostMessage from "./post.message.js";
import { createService } from "./post.service.js";
import HttpCodes from 'http-status-codes';
import { CategoryModel } from "../category/category.model.js";
import { OptionModel } from "../option/option.model.js";
import createHttpError, { HttpError } from 'http-errors';
import { isValidObjectId, Types } from "mongoose";
import getAddressDetail from "../../common/utils/http.js";
import { removePropertyInObject } from "../../common/utils/functions.js";
import { PostModel } from "./post.model.js";
import utf8 from 'utf8'

export const create = async (req, res, next) => {
    try {
        const { title_post: title, description: content, lat, lng, category, userId, amount } = req.body;
        const images = req?.files?.map(image => image?.path?.slice(7))
        const options = removePropertyInObject(req.body, ['title_post', 'description', 'lat', 'lng', 'category', 'images', 'userId', 'amount']);
        for (let key in options) {
            let value = options[key];
            delete options[key];
            key = utf8.decode(key);
            options[key] = value;
        }
        const { address, province, city, district } = await getAddressDetail(lat, lng);
        await createService({
            title,
            content,
            coordinate: [lat, lng],
            category: new Types.ObjectId(category),
            images,
            options,
            address,
            province,
            city,
            district,
            userId,
            amount
        })
        return res.json({
            message: PostMessage.Created
        })
    } catch (error) {
        next(error);
    }
}

export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id || !isValidObjectId(id)) throw new createHttpError.BadRequest(PostMessage.RequestNotValid)
        const post = await PostModel.findById(id);
        if (!post) throw new createHttpError.BadRequest(PostMessage.NotFound)
        await PostModel.deleteOne({ _id: id });
        return res.json({
            message: PostMessage.Deleted
        })
    } catch (error) {
        next(error);
    }
}

// postPage
export const postPage = async (req, res, next) => {
    try {
        let { slug } = req.query;
        let match = { parent: null };
        let options, category;
        if (slug) {
            slug = slug.trim();
            category = await CategoryModel.findOne({ slug });
            if (!category) throw new createHttpError.NotFound(PostMessage.NotFound)
            options = await OptionModel.find({ category: category._id });
            if (options.length === 0) options = null
            match = {
                parent: category._id
            }
        }
        const categories = await CategoryModel.aggregate([
            {
                $match: match
            }
        ]);
        return res.status(HttpCodes.OK).json({
            categories,
            options,
            category
        })
    } catch (error) {
        next(error);
    }
}

// myPosts
export const myPosts = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const query = req.query;
        if (userId && isValidObjectId(userId)) {
            const posts = await await PostModel.find({ userId });
            return res.json({
                posts
            })
        } else {
            throw new createHttpError.BadRequest(PostMessage.RequestNotValid)
        }
    } catch (error) {
        next(error);
    }
}

// showPost
export const showPost = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id || !isValidObjectId(id)) throw new createHttpError.BadRequest(PostMessage.RequestNotValid)
        const post = await PostModel.aggregate([
            {
                $match: {
                    _id: new Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    userMobile: "$user.mobile",
                }
            },
            {
                $project: {
                    user: 0
                }
            }
        ])
        if (!post) throw new createHttpError.BadRequest(PostMessage.NotFound)
        return res.json({
            post,
        })
    } catch (error) {
        next(error);
    }
}

// postAll
export const postAll = async (req, res, next) => {
    try {
        let { category, search } = req.query;

        let query = {};

        if (category) {
            const result = await CategoryModel.findOne({ slug: category });
            let categories = await CategoryModel.find({ parents: result._id }, { _id: 1 });
            categories = categories.map(i => i._id);
            if (result) {
                query['category'] = {
                    $in: [result._id, ...categories]
                }
            } else {
                return [];
            }
        }

        if (search) {
            search = new RegExp(search, "ig");
            query['$or'] = [
                { title: search },
                { description: search }
            ]
        }

        const posts = await PostModel.find(query, {}, { sort: { _id: -1 } });

        return res.json({
            posts
        })
    } catch (error) {
        next(error);
    }
}