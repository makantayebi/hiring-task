import { Request, Response } from "express";
import { errorHandlerWrapper } from "@/utils";
import { authService } from "@/services";
import { createText, evaluateText } from "@/services/text.service";
import { TextEntity } from "@/entities/text.entity";
import { AppDataSource } from "@/setup/datasource";
const sentimentAnalyzer = async (req: Request, res: Response) => {
  const text = req.body.text;
  const userEntity = await authService.getUserFromReq(req);
  const userId = userEntity.uuid;
  const textEntity: TextEntity = await createText({ text, userId });

  // TODO: Get the real sentiment..
  textEntity.sentiment = "Good";
  evaluateText(textEntity);
  res.status(201).json({ message: "Success" });
};

const allTextsOfUser = async (req: Request, res: Response) => {
  const userEntity = await authService.getUserFromReq(req);
  const textRepository = AppDataSource.getRepository(TextEntity);
  try {
    const texts = await textRepository.find({
      where: { user: { uuid: userEntity.uuid } },
    });
    res.status(201).json(texts);
  } catch (error) {
    console.error("Error fetching rows:", error);
    throw error;
  }
};
export const analyze = errorHandlerWrapper(sentimentAnalyzer);
export const getAll = errorHandlerWrapper(allTextsOfUser);
