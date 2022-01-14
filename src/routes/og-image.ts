import { Router } from "express";
import { generateImage } from "../controller/generateArticleImage";

const router = Router();

router.get("/og-image/:category/:slug", generateImage);

export default router;
