import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import Bot from "./Bot.js";

const AssetTransaction = db.define("AssetTransaction", {
  assettransaction_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  AssetName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  AssetPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export default AssetTransaction;