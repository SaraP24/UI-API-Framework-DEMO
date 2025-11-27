import { test } from '../../../fixtures/customFixtures';
import { expect } from '@playwright/test';

test.describe('User Management - Create Multiple Users from Array', () => {
  test('should successfully create multiple users from an array of user data', async ({ petApi, assertionsApi }) => {
    const users = [
      { username: 'user1', firstName: 'User', lastName: 'One', email: 'user1@example.com', password: 'pass1' },
      { username: 'user2', firstName: 'User', lastName: 'Two', email: 'user2@example.com', password: 'pass2' }
    ];

    const response = await petApi.createUsersWithArray(users);
    await assertionsApi.responseIsOk(response);
    
    const result = await response.json();
    expect(result.code).toBe(200);
  });
});
