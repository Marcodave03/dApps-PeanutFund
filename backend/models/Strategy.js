import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import Bot from "./Bot.js";

const Strategy = db.define("Strategy", {
  strategy_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  StrategyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  StrategyType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  StrategyDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

export default Strategy;