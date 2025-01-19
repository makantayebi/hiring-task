import { Request, Response } from "express";
import { errorHandlerWrapper } from "@/utils";
import { authService } from "@/services";
import { createText, evaluateText } from "@/services/text.service";
import { TextEntity } from "@/entities/text.entity";
const sentimentAnalyzer = async (req: Request, res: Response) => {
  console.log("let the analysis begin");
  console.debug("text is: " + req.body.text);
  const text = req.body.text;
  const userEntity = await authService.getUserFromReq(req);
  const userId = userEntity.uuid;
  const textEntity: TextEntity = await createText({ text, userId });

  // TODO: Get the real sentiment..
  textEntity.sentiment = "Good";
  evaluateText(textEntity);
  res.status(201).json({ message: "Success" });
};

export const analyze = errorHandlerWrapper(sentimentAnalyzer);
