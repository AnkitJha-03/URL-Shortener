import express from "express";
import { url_creator } from "../controllers/url_creator.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", isAuthenticated, url_creator)

export default router;