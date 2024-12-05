import { PostModel } from "./post.model.js";

export const createService = async (dto) => {
    return await PostModel.create(dto);
}