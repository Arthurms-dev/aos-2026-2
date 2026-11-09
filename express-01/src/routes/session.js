import { Router } from "express";
import { sessionController } from "../controllers/index.js";
import { authMiddleware, authLimiterMiddleware } from "../middlewares/index.js"; 

const router = Router();

router.post("/", authLimiterMiddleware, sessionController.login);

router.get("/", authMiddleware, sessionController.getSession);

export default router;