import { Express } from "express";
import { createHandler } from "graphql-http/lib/use/express";
import schema from "./schema"; // Your GraphQL schema

export const graphqlApp = (app: Express) => {
  const handler = createHandler({ schema });
  app.use("/graphql", handler);
};
