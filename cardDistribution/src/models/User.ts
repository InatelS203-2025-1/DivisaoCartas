import { db } from '../config/database'
import { UserModel } from '../interfaces/UserModel';
import Card from './Card';


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

  //lilyan

  static getUserCards(userId: string): { id: number; name: string }[] {
    const query = `
      SELECT cards.id, pokemons.name
      FROM cards
      JOIN pokemons ON cards.id = pokemons.id
      WHERE cards.user_id = ?
    `;

    const rows = db.all(query, [userId]) as { id: number; name: string }[];

    return rows;
  }
  
  static getUserById(id: string): UserModel | undefined {
    const user = this.findById(id);
    if (!user) return undefined;

    const cards = db.all<Card>('SELECT * FROM cards WHERE user_id = ?', [id]);
    return { ...user, card: cards };
  }

  //Leticia
  static updateUserCards(cardId: number, newUserId: string): void {
    db.run('UPDATE cards SET user_id = ? WHERE id = ?', [newUserId, cardId]);

  }
}
