import User from "../models/User.js";
import Balance from "../models/Balance.js";
import UserAsset from "../models/UserAsset.js";
import db from "../config/Database.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  const { InternetID, InternalUserKey, Username, Email, Password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(Password, 10);
    const transaction = await db.transaction();
    try {
      const newUser = await User.create(
        {
          InternetID,
          InternalUserKey,
          Username,
          Email,
          Password: hashedPassword,
        },
        { transaction }
      );
      await newUser.createBalance(
        {
          TotalAmount: 0,
          Date: new Date(),
        },
        { transaction }
      );
      await transaction.commit();
      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      await transaction.rollback();
      return res.status(500).json({ message: "Registration failed", error });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};


export const updateBalance = async (req, res) => {
    const { user_id } = req.params; 
    const { TotalAmount } = req.body; 
  
    try {
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const balance = await Balance.findOne({ where: { user_id } });
      if (!balance) {
        return res.status(404).json({ message: "Balance not found for this user" });
      }
      await balance.update({ TotalAmount });
      return res.json({ message: "Balance updated successfully", balance });
    } catch (error) {
      console.error("Error updating balance:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };


  export const updateUsername = async (req, res) => {
    const { user_id } = req.params; 
    const { Username } = req.body; 

    try {
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.update({ Username });

        return res.json({ message: "Username updated successfully", user });
    } catch (error) {
        console.error("Error updating username:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const addUserAsset = async (req, res) => {
    const { user_id, AssetName, AssetPrice } = req.body;
    
    try {
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const asset = await UserAsset.create({ user_id, AssetName, AssetPrice });
        return res.status(201).json({ message: "Asset added successfully", asset });
    } catch (error) {
        console.error("Error adding asset:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const editUserAsset = async (req, res) => {
    const { userasset_id } = req.params;
    const { AssetPrice } = req.body;

    try {
        const asset = await UserAsset.findByPk(userasset_id);
        if (!asset) {
            return res.status(404).json({ message: "Asset not found" });
        }

        await asset.update({ AssetPrice });
        return res.json({ message: "Asset price updated successfully", asset });
    } catch (error) {
        console.error("Error updating asset price:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteUserAsset = async (req, res) => {
    const { userasset_id } = req.params;

    try {
        const asset = await UserAsset.findByPk(userasset_id);
        if (!asset) {
            return res.status(404).json({ message: "Asset not found" });
        }

        await asset.destroy();
        return res.json({ message: "Asset deleted successfully" });
    } catch (error) {
        console.error("Error deleting asset:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


  


