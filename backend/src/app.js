import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookierParser from "cookie-parser";
import connnectDB from "./configs/db.config.js";
import url_creator_route from "./routes/url_creator.route.js";
import url_redirector_route from "./routes/url_redirector.route.js";
import { errorHandler } from "./utils/error_handler.util.js";


const app = express();
dotenv.config();

app.use(express.json({limit: process.env.LIMIT}));
app.use(urlencoded({extended: true, limit: process.env.LIMIT}));
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(cookierParser());

// connection to database before starting the services
connnectDB();

app.use("/api/v1/create", url_creator_route);

app.use("/", url_redirector_route);




app.use(errorHandler);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server is running on port : ", port);
})