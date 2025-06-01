import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import Bot from "./Bot.js";

const Transaction = db.define("Transaction", {
  transaction_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  TxHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  Amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  TransactionType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Transaction;