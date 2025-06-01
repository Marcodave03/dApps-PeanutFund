import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import Bot from "./Bot.js";

const Model = db.define("Model", {
  model_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ModelName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Architecture: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ModelType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Model;