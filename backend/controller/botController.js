
import Bot from "../models/Bot.js";
import Model from "../models/Model.js";
import Strategy from "../models/Strategy.js";
import AssetTransaction from "../models/AssetTransaction.js";

export const createBot = async (req, res) => {
    const { BotName, BotAPI, Status, ModelName, Architecture, ModelType, StrategyName, StrategyType, StrategyDescription } = req.body;

    try {
        const newBot = await Bot.create({ BotName, BotAPI, Status });
        const newModel = await Model.create({
            bot_id: newBot.bot_id,
            ModelName,
            Architecture,
            ModelType,
        });
        const newStrategy = await Strategy.create({
            bot_id: newBot.bot_id,
            StrategyName,
            StrategyType,
            StrategyDescription,
        });
        return res.status(201).json({
            message: "Bot created successfully with Model and Strategy",
            bot: newBot,
            model: newModel,
            strategy: newStrategy,
        });
    } catch (error) {
        console.error("Error creating bot:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const addAsset = async (req, res) => {
    const { bot_id, AssetName, AssetPrice } = req.body;

    try {
        const bot = await Bot.findByPk(bot_id);
        if (!bot) {
            return res.status(404).json({ message: "Bot not found" });
        }
        const newAsset = await AssetTransaction.create({ bot_id, AssetName, AssetPrice });

        return res.status(201).json({ message: "Asset added successfully", asset: newAsset });
    } catch (error) {
        console.error("Error adding asset:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const editAsset = async (req, res) => {
    const { assettransaction_id } = req.params;
    const { AssetPrice } = req.body;

    try {
        const asset = await AssetTransaction.findByPk(assettransaction_id);
        if (!asset) {
            return res.status(404).json({ message: "Asset not found" });
        }
        await asset.update({ AssetPrice });
        return res.status(200).json({ message: "Asset updated successfully", asset });
    } catch (error) {
        console.error("Error updating asset:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const deleteAsset = async (req, res) => {
    const { assettransaction_id } = req.params;

    try {
        const asset = await AssetTransaction.findByPk(assettransaction_id);
        if (!asset) {
            return res.status(404).json({ message: "Asset not found" });
        }
        await asset.destroy();
        return res.status(200).json({ message: "Asset deleted successfully" });
    } catch (error) {
        console.error("Error deleting asset:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const createTransaction = async (req, res) => {
  try {
    const { bot_id } = req.params; 
    const { TxHash, Price, Amount, TransactionType } = req.body;

    // Check if the bot exists
    const bot = await Bot.findByPk(bot_id);
    if (!bot) {
      return res.status(404).json({ message: "Bot not found" });
    }
    const transaction = await bot.createTransaction({
      TxHash,
      Price,
      Amount,
      TransactionType,
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
