import { UserModel } from '../interfaces/UserModel';
import { knex as db } from '../config/knexfile';

export default class User {
  static async createUser(user: UserModel): Promise<any> {
    const felipe = await db('users').insert({ id: user.id, name: user.name }).returning('*');
    console.log(felipe);

    const cards = await Promise.all(
      user.card.map((card) => db('cards').insert({ id: card.id, user_id: user.id })),
    );
    console.log(cards);
    return { felipe, cards };
  }

  static async findAll(): Promise<UserModel[]> {
    return db('users').select('*');
  }

  static async findById(id: string): Promise<UserModel | undefined> {
    const user = await db('users').where({ id }).first();
    return user as UserModel | undefined;
  }

  static async getUserCards(userId: string): Promise<{ id: number; name: string }[]> {
    const userCards = await db('cards').select('*');
    // .join('users', 'cards.user_id', '=', 'users.id')
    // .where('cards.user_id', userId)
    // .select('cards.id', 'users.name');
    console.log(userCards);
    return userCards;
  }

  static async getUserById(userId: string): Promise<UserModel | undefined> {
    const user = await this.findById(userId);
    if (!user) return undefined;
    // return user;

    const cards = await db('cards').where({ user_id: userId });
    return { ...user, card: cards };
  }

  static async updateUserCards(cardId: number, newUserId: string): Promise<void> {
    await db('cards').where({ id: cardId }).update({ user_id: newUserId });
  }
}
