import express from "express";
import { url_creator } from "../controllers/url_creator.controller.js";

const router = express.Router();

router.post("/", url_creator)

export default router;