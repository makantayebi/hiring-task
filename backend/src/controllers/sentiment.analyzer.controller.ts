import { Request, Response } from "express";
import { errorHandlerWrapper } from "@/utils";
import { authMiddleware } from "@/middlewares";
const sentimentAnalyzer = async (req: Request, res: Response) => {
  // TODO: rate the sentiment.
  res.status(201).json({ message: "Success" });
};

function rateAndInsert() {}
export const analyze = errorHandlerWrapper(sentimentAnalyzer);
