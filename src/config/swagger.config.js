import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const SwaggerConfig = (app) => {
    const swaggerDocument = swaggerJsdoc({
        definition: {
            openapi: "3.0.1",
            info: {
                title: "divar",
                description: "",
                version: "1.0.0"
            },
            servers: [
                {
                    url: "http://localhost:3000/api",
                    description: "development",
                },
            ],
        },
        apis: [process.cwd() + "/src/modules/**/*.swagger.js"],
    })

    const swagger = swaggerUi.setup(swaggerDocument);

    app.use("/api-docs", swaggerUi.serve, swagger);
}

export default SwaggerConfig;