import express, { NextFunction, Request, Response, Express } from "express";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";
import env from "../../zodSchema";
import ordersRouter from "./routers/orders-router";
import usersRouter from "./routers/users-router";
import productsRouter from "./routers/products-router";

export const restfulApp = (app: Express) => {
  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());

  app.use(`/api/${env.API_VERSION}/users`, usersRouter);
  app.use(`/api/${env.API_VERSION}/products`, productsRouter);
  app.use(`/api/${env.API_VERSION}/orders`, ordersRouter);
  //end point not found error handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(createHttpError(404, "end point not found"));
  });

  //default error handler
  app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    let errorMessage = "an unknown error occurred";
    let statusCode = 500;
    if (isHttpError(err)) {
      errorMessage = err.message;
      statusCode = err.status;
    }
    res.status(statusCode).json({ error: errorMessage });
  });
};
