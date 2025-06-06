import express from "express";
import { registerUser } from "../controller/userController.js";
import { updateBalance } from "../controller/userController.js";
import { updateUsername } from "../controller/userController.js";
import { addUserAsset } from "../controller/userController.js";
import { editUserAsset } from "../controller/userController.js"; 
import { deleteUserAsset } from "../controller/userController.js";

const router = express.Router();
router.post("/register",registerUser);

//update portofolio
router.put("/updatebalance/:user_id", updateBalance);
router.put("/updatename/:user_id", updateUsername);

//update asset
router.post("/addasset", addUserAsset);
router.put("/editasset/:userasset_id", editUserAsset);
router.delete("/deleteasset/:userasset_id", deleteUserAsset);

export default router;