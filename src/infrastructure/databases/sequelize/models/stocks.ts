import { DataTypes, Model, Sequelize } from "sequelize";

export class StocksModel extends Model {
  public id!: number;
  public stock_ticker!: string;
}

export function initStockModel(sequelize: Sequelize) {
  StocksModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      stock_ticker: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "stocks",
    },
  );

  return StocksModel;
}
