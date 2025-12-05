import { TestModel, initTestModel } from "./test-model";
import type { Sequelize } from "sequelize";

export function initModels(sequelize: Sequelize) {
  initTestModel(sequelize);
}

export { TestModel };
