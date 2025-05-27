import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { knex } from './config/knexfile';
import router from './routes/routes';

dotenv.config();

// eslint-disable-next-line import/prefer-default-export
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.get('/', async (_req: Request, res: Response) => {
  const tables = await knex('sqlite_schema').select('*');
  res.json(tables);
});
