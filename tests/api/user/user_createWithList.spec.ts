import { test } from '../../../fixtures/customFixtures';
import { expect } from '@playwright/test';

test.describe('Create Multiple Users from List', () => {
  test('should successfully create multiple users from a list of user data', async ({ userApiClient, assertionsApi }) => {
    const users = [
      { username: 'user3', firstName: 'User', lastName: 'Three', email: 'user3@example.com', password: 'pass3' },
      { username: 'user4', firstName: 'User', lastName: 'Four', email: 'user4@example.com', password: 'pass4' }
    ];

    const response = await userApiClient.createUsersWithList(users);
    await assertionsApi.responseIsOk(response);
    
    const result = await response.json();
    expect(result.code).toBe(200);
  });
});
