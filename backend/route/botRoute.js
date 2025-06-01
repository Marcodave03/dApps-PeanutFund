import express from "express";
import { createBot } from "../controller/botController.js";
import { addAsset, editAsset, deleteAsset } from "../controller/botController.js";
import { createTransaction } from "../controller/botController.js";
const router = express.Router();

router.post("/createbot", createBot);

router.post("/addasset", addAsset); 
router.put("/editasset/:assettransaction_id", editAsset); 
router.delete("/deleteasset/:assettransaction_id", deleteAsset); 

router.post("/addtransaction/:bot_id", createTransaction); 

export default router;