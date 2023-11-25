import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string(),
  DB_URI: z.string().url(),
  SALT_WORK_FACTOR: z.string(),
});

export const { DB_URI, PORT, SALT_WORK_FACTOR } = envSchema.parse(process.env);
