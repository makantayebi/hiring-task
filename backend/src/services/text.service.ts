/** @format */

import { TextEntity } from "@/entities/text.entity";
import { AppDataSource } from "@/setup/datasource";
import { CreateTextRequestType } from "@/types";

export const createText = async ({
  userId,
  text,
}: CreateTextRequestType): Promise<TextEntity | null> => {
  const textRepo = AppDataSource.getRepository(TextEntity);
  const newText = new TextEntity();
  Object.assign(newText, { userId, text });
  return await textRepo.save(newText);
};

export const evaluateText = async (text: TextEntity): Promise<boolean> => {
  const textRepo = AppDataSource.getRepository(TextEntity);
  await textRepo.update(text.id, { sentiment: text.sentiment });
  return true;
};
