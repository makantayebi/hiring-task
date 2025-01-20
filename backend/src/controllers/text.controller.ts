import { Request, Response } from "express";
import { errorHandlerWrapper } from "@/utils";
import { authService } from "@/services";
import { createText, storeTextEvaluation } from "@/services/text.service";
import { TextEntity } from "@/entities/text.entity";
import { AppDataSource } from "@/setup/datasource";
const sentimentAnalyzer = async (req: Request, res: Response) => {
  const text = req.body.text;
  const userEntity = await authService.getUserFromReq(req);
  const userId = userEntity.uuid;
  const textEntity: TextEntity = await createText({ text, userId });
  fetchEvaluation(textEntity);
  res.status(201).json({ message: "Success" });
};
interface EvalEngineResponse {
  text: string;
  sentiment: string;
  confidence: number;
}

// Decoupling: Make the call to the eval-engine async.
function fetchEvaluation(textEntity: TextEntity) {
  console.debug("fetching evaluation for text: " + textEntity.text);
  var text = textEntity.text;
  fetch(process.env.EVALUATION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const evaluation = data as EvalEngineResponse;
      textEntity.sentiment = evaluation.sentiment;
      // Once the sentiment is fetched, update in db.
      storeTextEvaluation(textEntity);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

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
