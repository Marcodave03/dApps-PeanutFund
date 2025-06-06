import { DataTypes } from "sequelize";
import db from "../config//Database.js";
import User from "./User.js";

const Balance = db.define("Balance", {
  balance_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  TotalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  Date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default Balance;