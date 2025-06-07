// 1. Third-party packages
import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// 2. Config
import connectDB from "./configs/db.config.js";

// 3. Routes
import auth_route from "./routes/auth.route.js";
import url_creator_route from "./routes/url_creator.route.js";
import url_redirector_route from "./routes/url_redirector.route.js";

// 4. Utils
import { errorHandler } from "./utils/error_handler.util.js";


const app = express();
dotenv.config();

app.use(express.json({limit: process.env.LIMIT}));
app.use(urlencoded({extended: true, limit: process.env.LIMIT}));
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(cookieParser());

// connection to database before starting the services
connectDB();

app.use("/api/v1/auth", auth_route);

app.use("/api/v1/create", url_creator_route);

app.use("/", url_redirector_route);


app.use(errorHandler);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server is running on port : ", port);
})