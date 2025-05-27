import { knex } from './knexfile';

export default async function setupDatabase(): Promise<void> {
  console.log('setting database..');
  const hasUsers = await knex.schema.hasTable('users');
  if (!hasUsers) {
    await knex.schema.createTable('users', (table) => {
      table.text('id').primary().unique();
      table.text('name').unique().notNullable();
    });
  }

  const hasCards = await knex.schema.hasTable('cards');
  if (!hasCards) {
    await knex.schema.createTable('cards', (table) => {
      table.increments('id').primary();
      table.text('user_id').notNullable();
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
    });
  }
}
