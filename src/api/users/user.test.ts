import { expect, test } from 'vitest'
import { getUsers, getUserById } from './user';

test('getUsers obtiene 10 usuarios', async () => {
    const data = await getUsers();
    expect(data).toBeDefined();
    expect(data).toHaveLength(10);
});

test('getUserById retorna un usuario por el ID igual a 1', async () => {
    const data = await getUserById(1);
    expect(data).toBeDefined();
    expect(data).toHaveProperty('id', 1);
});