import express from "express";
import { create_url, get_urls, delete_url } from "../controllers/url.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", isAuthenticated, create_url)
router.get("/get_urls", isAuthenticated, get_urls);
router.delete("/delete/:short_url", isAuthenticated, delete_url);

export default router;