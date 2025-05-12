import Database from 'better-sqlite3';
export class SQLiteDatabase {
  private db: InstanceType<typeof Database>;


  constructor(filename: string) {
    this.db = new Database(filename);
  }

  run(query: string, params?: any[]) {
    return this.db.prepare(query).run(params);
  }

  get<T>(query: string, params?: any[]): T | undefined {
    return this.db.prepare(query).get(params) as T;
  }

  all<T>(query: string, params?: any[]): T[] {
    return this.db.prepare(query).all(params) as T[];
  }
  setup(): void {
    this.db.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY UNIQUE,
        name TEXT NOT NULL
      )
    `).run();

    this.db.prepare(`
      CREATE TABLE IF NOT EXISTS cards (
        id INTEGER PRIMARY KEY UNIQUE,
        user_id TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `).run();
  }
}

export const db = new SQLiteDatabase('cardsystem.db');
