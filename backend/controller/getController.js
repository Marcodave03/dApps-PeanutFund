import User from "../models/User.js";
import UserAsset from "../models/UserAsset.js";
import Balance from "../models/Balance.js";
import Bot from "../models/Bot.js";
import Transaction from "../models/Transaction.js";
import Model from "../models/Model.js";
import AssetTransaction from "../models/AssetTransaction.js";
import Strategy from "../models/Strategy.js";

// export const getUserSession = async (req, res) => {
//   try {
//     const user = await User.findByPk(req.user.id, {
//       attributes: { exclude: ["password"] }, // Exclude sensitive data
//     });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const getUserAssets = async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      include: [{ model: UserAsset }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.UserAssets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserBalance = async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      include: [{ model: Balance }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.Balances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserBots = async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      include: [{ model: Bot }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.Bots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBotTransactions = async (req, res) => {
  try {
    const { bot_id } = req.params;

    const bot = await Bot.findByPk(bot_id, {
      include: [{ model: Transaction }],
    });

    if (!bot) {
      return res.status(404).json({ message: "Bot not found" });
    }

    res.json(bot.Transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBotModels = async (req, res) => {
  try {
    const { bot_id } = req.params;

    const bot = await Bot.findByPk(bot_id, {
      include: [{ model: Model }],
    });

    if (!bot) {
      return res.status(404).json({ message: "Bot not found" });
    }

    res.json(bot.Models);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBotAssets = async (req, res) => {
  try {
    const { bot_id } = req.params;

    const bot = await Bot.findByPk(bot_id, {
      include: [{ model: AssetTransaction }],
    });

    if (!bot) {
      return res.status(404).json({ message: "Bot not found" });
    }

    res.json(bot.AssetTransactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBotStrategy = async (req, res) => {
    try {
      const { bot_id } = req.params;
  
      const bot = await Bot.findByPk(bot_id, {
        include: [{ model: Strategy }],
      });
  
      if (!bot) {
        return res.status(404).json({ message: "Bot not found" });
      }
  
      res.json(bot.Strategies);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  