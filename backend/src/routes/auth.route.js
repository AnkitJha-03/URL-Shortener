import express from "express";
import { register, login, logout, refresh } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
router.post("/refresh", isAuthenticated, refresh);

export default router;
