import db from "../config/Database.js";

import User from "./User.js";
import UserAsset from "./UserAsset.js";
import AssetTransaction from "./AssetTransaction.js";
import Bot from "./Bot.js";
import Strategy from "./Strategy.js";
import Transaction from "./Transaction.js";
import Balance from "./Balance.js";
import Model from "./Model.js";

User.hasMany(Bot, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Bot.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.hasMany(Balance, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Balance.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(UserAsset, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
UserAsset.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Bot.hasMany(Model, {
  foreignKey: "bot_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Model.belongsTo(Bot, {
  foreignKey: "bot_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Bot.hasMany(Strategy, {
  foreignKey: "bot_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Strategy.belongsTo(Bot, {
  foreignKey: "bot_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Bot.hasMany(Transaction, {
  foreignKey: "bot_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Transaction.belongsTo(Bot, {
  foreignKey: "bot_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Bot.hasMany(AssetTransaction, {
  foreignKey: "bot_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
AssetTransaction.belongsTo(Bot, {
  foreignKey: "bot_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.sync({ alter: false });

export { User, UserAsset, AssetTransaction, Bot, Strategy, Transaction, Balance, Model };