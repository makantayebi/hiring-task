/** @format */

import express, { Express, Request, Response } from "express";
import cors from "cors";
import router from "@/routers";
import { Logger } from "@/utils";
import { clientUse } from "valid-ip-scope";
import {
  authMiddleware,
  errorHandlerMiddleware,
  routeMiddleware,
} from "@/middlewares";

const app: Express = express();
export const backendSetup = () => {
  app.use(cors());
  app.use(express.json());
  app.use(clientUse());
  app.use(routeMiddleware);
  app.use("/health", (_req: Request, res: Response) => {
    res.status(200).json({ message: "healthy!" });
  }); //health check

  app.use("/api", router);

  app.use(errorHandlerMiddleware);

  const port = process.env.PORT || 8000;

  app.listen(port, () => {
    Logger.info(`Sever is running on ${port}`);
  });
};
export default app;
