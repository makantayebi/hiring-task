/** @format */

import express from "express";
import { authRouter } from "./auth.router";
import { sentimentAnalyzerRouter } from "./sentiment.analyzer.router";

const router = express.Router();

router.use("/auth", authRouter);

router.use(sentimentAnalyzerRouter);

export default router;
