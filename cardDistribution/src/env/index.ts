import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['test', 'development', 'production']).default('production'),
  PORT: z.coerce.number().default(3500),
  POKEAPI: z.string(),
  DATABASE_URL: z.string(),
});

const env = envSchema.safeParse(process.env);

if (env.success === false) {
  console.error('Please check the environment variables!', env.error.format());

  throw new Error('Environment variables problem!');
}

export default env.data;
