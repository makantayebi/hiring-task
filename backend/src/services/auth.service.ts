/** @format */

import { UserEntity } from "@/entities";
import { AppDataSource } from "@/setup/datasource";
import { CreateUserRequestType } from "@/types";
import { Request } from "express";
import jwt from "jsonwebtoken";

export const createUser = async ({
  name,
  hashedPassword,
  role,
}: CreateUserRequestType): Promise<UserEntity | null> => {
  const userRepository = AppDataSource.getRepository(UserEntity);

  const existingUser = await userRepository.findOne({ where: { name } });

  if (existingUser) {
    return null;
  }

  const newUser = new UserEntity();
  Object.assign(newUser, { name, hashedPassword, role });

  return await userRepository.save(newUser);
};

export const getUserFromName = async ({ name }): Promise<UserEntity | null> => {
  const userRepository = AppDataSource.getRepository(UserEntity);

  const gettingUser: UserEntity | null = await userRepository.findOne({
    where: { name },
  });
  if (gettingUser) return gettingUser;
  return null;
};

export const getUserFromReq = async (req: Request): Promise<UserEntity> => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = getUserFromName(decoded);
  return user;
};
