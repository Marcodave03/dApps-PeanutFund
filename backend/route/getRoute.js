import express from "express";
import {
  getUserAssets,
  getUserBalance,
  getUserBots,
  getBotAssets,
  getBotModels,
  getBotTransactions,
  getBotStrategy
} from "../controller/getController.js";
const router = express.Router();

router.get("/userassets/:user_id", getUserAssets);
router.get("/userbalance/:user_id", getUserBalance);
router.get("/userbots/:user_id", getUserBots);
router.get("/botassets/:bot_id", getBotAssets);
router.get("/botmodels/:bot_id", getBotModels);
router.get("/bottransactions/:bot_id", getBotTransactions);
router.get("/botstrategy/:bot_id", getBotStrategy);

export default router;
