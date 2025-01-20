import { Request, Response } from "express";
import { errorHandlerWrapper } from "@/utils";
import { authService } from "@/services";
import { createText, storeTextEvaluation } from "@/services/text.service";
import { TextEntity } from "@/entities/text.entity";
import { AppDataSource } from "@/setup/datasource";
import { FeedbackEntity, UserEntity } from "@/entities";

// I'm not sure if putting the orm code in the controller folder is a good idea,
// But it's the given structure.
const newFeedback = async (req: Request, res: Response) => {
  const content = req.body.feedback;
  var textId = req.body.textId;
  console.log("Feedback to add: " + JSON.stringify(req.body));
  const userEntity = await authService.getUserFromReq(req);
  const textRepo = AppDataSource.getRepository(TextEntity);
  const id: number = parseInt(textId);
  const textEntity: TextEntity | null = await textRepo.findOne({
    where: { id },
  });
  if (textEntity.userId != userEntity.uuid) {
    console.warn(
      "user Id " +
        userEntity.name +
        " tried to give a feedback on behalf of user with uuid: " +
        textEntity.userId
    );
    res.status(403).json({ message: "I see what you did there ;)" });
    return;
  }
  const feedbackRepo = AppDataSource.getRepository(FeedbackEntity);
  const newFeedback = new FeedbackEntity();
  Object.assign(newFeedback, { content, textId });
  const feedbackEntity = await feedbackRepo.upsert(newFeedback, ["textId"]);
  res.status(201).json({ message: "Success" });
};

const allFeedbacks = async (req: Request, res: Response) => {
  // Check for user role.
  const userEntity = await authService.getUserFromReq(req);
  if (userEntity.role !== "admin") {
    res.status(403).json("Finger weg!");
    return;
  }
  try {
    // Select all feedbacks and their respective texts.
    const feedbacks = await AppDataSource.query(
      `
    SELECT "f".id, "f".content, "t".sentiment, "t".text AS "originalText"
    FROM "feedback" f
    JOIN  "text" t on ("f"."textId" = "t"."id")
`,
      [] // list of parameters, not needed.
    );

    console.log(feedbacks);
    res.status(201).json(feedbacks);
  } catch (error) {
    console.error("Error fetching rows:", error);
    throw error;
  }
};
export const addFeedback = errorHandlerWrapper(newFeedback);
export const getAll = errorHandlerWrapper(allFeedbacks);
