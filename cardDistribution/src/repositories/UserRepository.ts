import { v4 as uuidv4 } from 'uuid';
import { knex } from '../config/knexfile';
import { UserModel } from '../interfaces/UserModel';

interface UserFromDB {
  id: string;
  name: string;
}

class UserRepository {
  async findAll(): Promise<UserModel[]> {
    const users = await knex<UserFromDB>('users').select('*');
    return users.map((user: UserFromDB) => ({
      ...user,
      card: []
    }));
  }

  async findById(id: string): Promise<UserModel | undefined> {
    const user = await knex<UserFromDB>('users').where({ id }).first();
    if (!user) return undefined;

    return {
      ...user,
      card: []
    };
  }

  async findByName(name: string): Promise<UserModel | undefined> {
    const user = await knex<UserFromDB>('users').where({ name }).first();
    if (!user) return undefined;

    return {
      ...user,
      card: []
    };
  }

  async deleteById(id: string): Promise<void> {
    await knex('users').where({ id }).delete();
  }

  async create({ name }: Omit<UserModel, 'id' | 'card'>): Promise<UserModel> {
    const user = {
      id: uuidv4(),
      name,
      card: []
    };

    await knex('users').insert({
      id: user.id,
      name: user.name
    });

    return user;
  }

  async update(id: string, data: Partial<Omit<UserModel, 'id' | 'card'>>): Promise<UserModel | undefined> {
    await knex('users')
      .where({ id })
      .update(data);

    const updatedUser = await this.findById(id);
    return updatedUser;
  }
}

export default new UserRepository();
