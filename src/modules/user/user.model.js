import { model, Schema } from "mongoose";

const OTPSchame = new Schema({
    code: {
        type: String,
        required: false,
        default: undefined,
    },
    expiresIn: {
        type: Number,
        required: false,
        default: 0,
    }
});

const UserSchame = new Schema({
    fullName: {
        type: String,
        required: false,
    },
    mobile: {
        type: String,
        unique: true,
        required: true,
    },
    otp: {
        type: OTPSchame,
    },
    verifiedMobile: {
        type: Boolean,
        required: true,
        default: false
    },
}, { timestamps: true });


const UserModel = model("user", UserSchame);

export { UserModel }