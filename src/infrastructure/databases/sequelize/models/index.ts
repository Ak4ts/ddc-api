import { initStockModel } from "./stocks";
import { TestModel, initTestModel } from "./test-model";
import type { Sequelize } from "sequelize";

export function initModels(sequelize: Sequelize) {
  initTestModel(sequelize);
  initStockModel(sequelize);
}

export { TestModel };
