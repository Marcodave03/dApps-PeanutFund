import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const User = db.define("User", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  InternetID: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  InternalUserKey: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
