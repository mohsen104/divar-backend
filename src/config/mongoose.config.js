import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MongooseConfig = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("connected to DB.");
    } catch (error) {
        console.log(error?.message ?? "Failed DB connection");
    }
}

export default MongooseConfig;