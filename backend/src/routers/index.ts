/** @format */

import express from "express";
import { authRouter } from "./auth.router";
import { textRouter } from "./text.router";

const router = express.Router();

router.use("/auth", authRouter);

router.use("/text", textRouter);

export default router;
