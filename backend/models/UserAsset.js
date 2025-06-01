import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import User from "./User.js";

const UserAsset = db.define("UserAsset", {
  userasset_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  AssetName: {
    type: DataTypes.STRING,
    unique: true,
  },
  AssetPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default UserAsset;
