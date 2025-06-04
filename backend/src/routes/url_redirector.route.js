import express from "express";
import { url_redirector } from "../controllers/url_redirector.controller.js";

const router = express.Router();

router.get("/:short_url", url_redirector);

export default router;