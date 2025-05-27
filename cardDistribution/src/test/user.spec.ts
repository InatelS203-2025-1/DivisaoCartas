import { test, suite, expect } from 'vitest';
import request from 'supertest';
import { app } from '../server';

suite('User', () => {
  test('user creation', async () => {
    const response = await request(app)
      .post('/users')
      .send({ username: 'felipe' });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('felipe');
  });
});
