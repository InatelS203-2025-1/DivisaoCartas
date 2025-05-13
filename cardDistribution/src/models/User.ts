import { db } from '../config/database'
import { UserModel } from '../interfaces/UserModel';

// id: UserModel['id'], name: UserModel['name'], cards: Card[]


export default class User {
  static createUser(user: UserModel) {
    const query = 'INSERT INTO users (id, name) VALUES (?, ?)';
    db.run(query, [user.id, user.name]);

    for (const card of user.card) {
      db.run('INSERT INTO cards (id, user_id) VALUES (?, ?)', [card.id, user.id]);
    }
  }

  static findAll(): UserModel[] {
    return db.all<UserModel>('SELECT * FROM users');
  }

  static findById(id: string): UserModel | undefined {
    return db.get<UserModel>('SELECT * FROM users WHERE id = ?', [id]);
  }
}
