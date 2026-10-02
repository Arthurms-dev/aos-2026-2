import { Router } from "express";
import { portfolioController } from "../controllers/index.js";

const router = Router();

router.get("/perfil", portfolioController.getPerfil);
router.get("/academica", portfolioController.getAcademica);
router.get("/profissional", portfolioController.getProfissional);
router.get("/projetos", portfolioController.getProjetos);

export default router;