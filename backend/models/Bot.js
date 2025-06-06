import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import User from "./User.js";

const Bot = db.define("Bot", {
  bot_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  BotName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  BotAPI: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Bot;