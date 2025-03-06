import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();
export const envSchema = z.object({
  NODE_ENV: z
    .union([
      z.literal("development"),
      z.literal("testing"),
      z.literal("production"),
    ])
    .default("development"),
  API_TYPE: z.union([z.literal("rest"), z.literal("graphql")]).default("rest"),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number().int().min(1).max(65535).default(3306),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
