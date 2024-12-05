import { model, Schema, Types } from "mongoose";

const CategorySchame = new Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        index: true
    },
    icon: {
        type: String,
        required: true,
    },
    parent: {
        type: Types.ObjectId,
        required: false,
        ref: "category",
    },
    parents: {
        type: [Types.ObjectId],
        required: false,
        ref: "category",
        default: []
    },
}, { toJSON: { virtuals: true }, versionKey: false, id: false });


CategorySchame.virtual("children", {
    ref: "category",
    localField: "_id",
    foreignField: "parent"
})

function autoPopulate(next) {
    this.populate([{ path: "children" }])
    next();
}

CategorySchame.pre("find", autoPopulate).pre("findOne", autoPopulate)

const CategoryModel = model("category", CategorySchame);

export { CategoryModel }