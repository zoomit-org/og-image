import { Router } from "express";
import { generateImage } from "../controller/generateArticleImage";

const router = Router();

router.get("/og-image/:pageId", generateImage);

export default router;
