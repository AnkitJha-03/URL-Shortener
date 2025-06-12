import express from "express";
import { redirector } from "../controllers/redirector.controller.js";

const router = express.Router();

router.get("/:short_url", redirector);

export default router;
