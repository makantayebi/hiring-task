import { textController } from "@/controllers";
import { authMiddleware } from "@/middlewares";

import { Router } from "express";

export const textRouter = Router();
textRouter.use(authMiddleware);
textRouter.post("/analyze", textController.analyze);
textRouter.post("/all", textController.getAll);
