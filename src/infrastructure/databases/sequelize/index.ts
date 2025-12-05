import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST as string,
    dialect: "mysql",
    logging: false,
  },
);

import { initModels } from "./models";

// Initialize models with the Sequelize instance to avoid circular imports
initModels(sequelize);

export { sequelize };
export * from "./models";
export * from "./repositories";
