/** @format */

import express from "express";
import { authRouter } from "./auth.router";
import { textRouter } from "./text.router";
import { feedbackRouter } from "./feedback.router";

const router = express.Router();

router.use("/auth", authRouter);

router.use("/text", textRouter);
router.use("/feedback", feedbackRouter);

export default router;
