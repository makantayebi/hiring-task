import { sentimentAnalyzerController } from "@/controllers";

import { Router } from "express";

export const sentimentAnalyzerRouter = Router();

sentimentAnalyzerRouter.post("/analyze", sentimentAnalyzerController.analyze);
