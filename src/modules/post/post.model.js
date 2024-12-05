import { model, Schema, Types } from "mongoose";

const PostSchame = new Schema({
    userId: {
        type: Types.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: Types.ObjectId,
        required: true,
        ref: "Category"
    },
    province: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    coordinate: {
        type: [Number],
        required: true,
    },
    images: {
        type: [String],
        required: false,
        default: []
    },
    options: {
        type: Object,
        default: {}
    }
}, { timestamps: true });

const PostModel = model("post", PostSchame);

export { PostModel }