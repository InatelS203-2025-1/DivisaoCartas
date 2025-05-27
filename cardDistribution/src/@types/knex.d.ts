// eslint-disable-next-line
import knex from "knex";

declare module 'knex/types/tables' {
  export interface Tables {
    'users': {
      id: string,
      name: string,
    },
    'cards': {
      id: number,
      user_id: string
    }
  }
}
