import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import MongooseConfig from './src/config/mongoose.config.js';
import SwaggerConfig from './src/config/swagger.config.js';
import AllRoutes from './src/app.routes.js';
import NotFoundHandler from './src/common/exception/not-found.handler.js';
import AllExceptionHandler from './src/common/exception/all-exception.handler.js';
import cookieParser from 'cookie-parser';

const main = async () => {
    const app = express();
    const port = process.env.PORT;
    MongooseConfig();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"))
    app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
    app.use("/api", AllRoutes);
    SwaggerConfig(app);
    NotFoundHandler(app);
    AllExceptionHandler(app);
    app.listen(port, () => {
        console.log(`server: http://localhost:${port}`);
    })
}

main();