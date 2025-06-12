import express from "express";
import { create_url, get_urls, delete_url, get_url_analytics } from "../controllers/url.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", isAuthenticated, create_url);
router.get("/get_urls", isAuthenticated, get_urls);
router.delete("/delete/:id", isAuthenticated, delete_url);
router.get("/analytics/:id", isAuthenticated, get_url_analytics);

export default router;
