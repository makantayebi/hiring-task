/** @format */

import express from "express";
import { authRouter } from "./auth.router";
import { sentimentAnalyzerRouter } from "./sentiment.analyzer.router";

const router = express.Router();

router.use("/auth", authRouter);

router.use("/analyze", sentimentAnalyzerRouter);

export default router;
