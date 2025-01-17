import { Request, Response } from "express";
import { errorHandlerWrapper } from "@/utils";

const sentimentAnalyzer = async (req: Request, res: Response) => {
  // TODO: rate the sentiment.
  res.status(201).json({ message: "S" });
};
export const analyze = errorHandlerWrapper(sentimentAnalyzer);
