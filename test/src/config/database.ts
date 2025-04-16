import Database from 'better-sqlite3';
import { IDatabase } from './IDatabase';


export class SQLiteDatabase {
  private db: Database.Database;

  constructor(filename: string) {
    this.db = new Database(filename);
  }
  async query(query: string) {
    const { rows } = this.db.prepare('INSERT INTO TABLE users () VALUES ($1, $2, $3)')


  }
}
