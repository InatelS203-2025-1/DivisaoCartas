/* eslint-disable class-methods-use-this */
import { v4 as uuidv4 } from 'uuid';
import { knex } from '../config/knexfile';

interface UserFromDB {
  id: string;
  name: string;
}

class UserRepository {
  async findAll() {
    const users = await knex<UserFromDB>('users').select('*');
    return users.map((user: UserFromDB) => ({
      ...user,
      card: [],
    }));
  }

  async findById(id: string) {
    const user = await knex<UserFromDB>('users').where({ id }).first();
    if (!user) return undefined;

    return {
      ...user,
      card: [],
    };
  }

  async findCardsById(userId: string) {
    const cards = await knex('cards').select('*').where('user_id', userId);
    return cards;
  }

  async findByName(name: string) {
    const user = await knex<UserFromDB>('users').where({ name }).first();
    if (!user) return undefined;

    return {
      ...user,
      card: [],
    };
  }

  async deleteById(id: string): Promise<void> {
    await knex('users').where({ id }).delete();
  }

  async create({ name, card }: { name: string, card: number[] }) {
    const user = {
      id: uuidv4(),
      name,
      card,
    };

    await knex('users').insert({
      id: user.id,
      name: user.name,
    });

    const cardRows = card.map((cardNumber) => ({
      user_id: user.id,
      id: cardNumber,
    }));
    if (cardRows.length > 0) {
      await knex('cards').insert(cardRows);
    }

    return { user: user.id, cardRows };
  }

  async update(id: string, cardId: number, oldCardId: number) {
    await knex('cards')
      .where('user_id', id).where('id', oldCardId)
      .update({ user_id: id, id: cardId });
    const updatedUser = await this.findById(id);
    return updatedUser;
  }
}

export default new UserRepository();
