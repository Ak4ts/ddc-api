import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DDC API",
      version: "1.0.0",
      description: "API documentation for DDC API",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
      },
    ],
  },
  // Paths to files containing OpenAPI definitions in JSDoc comments
  // include nested controller folders and any files under src that might contain JSDoc OpenAPI comments
  apis: ["./src/main/**/*.ts", "./src/**/controllers/**/*.ts", "./src/**/controllers/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
