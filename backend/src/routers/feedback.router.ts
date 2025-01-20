import { feedbackController } from "@/controllers";
import { authMiddleware } from "@/middlewares";

import { Router } from "express";

export const feedbackRouter = Router();
feedbackRouter.use(authMiddleware);
feedbackRouter.post("/all", feedbackController.getAll);
feedbackRouter.post("/new", feedbackController.addFeedback);
