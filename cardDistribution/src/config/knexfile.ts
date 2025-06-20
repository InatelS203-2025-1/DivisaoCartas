/* eslint-disable */
import { knex as setupKnex } from 'knex';
import env from '../env/'

export const knex = setupKnex({
  client: 'better-sqlite3',
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
});
