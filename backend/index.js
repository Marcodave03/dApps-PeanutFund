import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import sequelize from "./config/Database.js";
import userRoute from "./route/userRoute.js";
import botRoute from "./route/botRoute.js";
import getRoute from "./route/getRoute.js";
import "./models/Association.js";


dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use("/api/portofolio",userRoute);
app.use("/api/bot",botRoute);
app.use("/api/get",getRoute);

const port = process.env.PORT;
if (!port) {
  console.error("Port is not defined in the environment variables");
  process.exit(1);
}

(async () => {
  try {
    await sequelize.sync({ alter: false, force: false });
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    }); 
  } catch (error) {
    console.error("Error starting server or seeding database:", error);
    process.exit(1);
  }
})();
