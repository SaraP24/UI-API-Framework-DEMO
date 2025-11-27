import { test } from '../../../fixtures/customFixtures';
import { expect } from '@playwright/test';

test.describe('Create User', () => {
  test('should successfully create a new user with valid data', async ({ petApi, assertionsApi }) => {
    const newUser = {
      username: 'testuser',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password123'
    };

    const response = await petApi.createUser(newUser);
    await assertionsApi.responseIsOk(response);
    
    const result = await response.json();
    expect(result.code).toBe(200);
  });
});
