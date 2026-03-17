import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "@infra/swagger";
import logger from "@infra/logger";
import { errorHandler } from "@infra/express/middlewares/error-handler";
import { makeTestController, makeStocksController } from "@main/composer";

dotenv.config();

// Morgan stream to forward logs to winston
const morganStream = {
  write: (message: string) => {
    // Morgan adds a newline; remove it
    logger.info(message.trim());
  },
};

export function createApp() {
  const app = express();

  const testController = makeTestController();
  const stocksController = makeStocksController();

  app.use(bodyParser.json());

  // HTTP request logging
  app.use(morgan("combined", { stream: morganStream }));

  // Swagger UI available at /docs (enabled in all environments)
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.post("/tests", testController.createTest.bind(testController));
  app.get("/tests/:id", testController.getTestById.bind(testController));
  app.post("/stocks", stocksController.getStock.bind(stocksController));

  app.use(errorHandler);

  return app;
}
