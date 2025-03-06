import { createServer } from "http";
import env from "../zodSchema";
import { AppDataSource } from "./data-source";
import { graphqlApp } from "./graphql_api/graphqlApp";
import express from "express";
import { restfulApp } from "./rest_api/restfulApp";
const app = express();
const server = createServer(app);
AppDataSource.initialize()
  .then(() => {
    // Read API type from environment variables
    console.log("Database connected");

    if (env.API_TYPE === "rest") {
      console.log("Starting REST API...");
      restfulApp(app);
    } else if (env.API_TYPE === "graphql") {
      console.log("Starting GraphQL API...");
      graphqlApp(app);
    } else {
      console.error("Invalid API_TYPE. Use 'rest' or 'graphql' in .env file.");
      process.exit(1);
    }

    server.listen(env.PORT, () => {
      console.log(`Server running on http://localhost:${env.PORT}`);
    });
  })
  .catch((error) => console.log(error));
