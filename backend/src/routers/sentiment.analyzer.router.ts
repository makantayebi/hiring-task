import { sentimentAnalyzerController } from "@/controllers";
import { authMiddleware } from "@/middlewares";

import { Router } from "express";

export const sentimentAnalyzerRouter = Router();

sentimentAnalyzerRouter.post("/analyze", sentimentAnalyzerController.analyze);
sentimentAnalyzerRouter.use(authMiddleware);
