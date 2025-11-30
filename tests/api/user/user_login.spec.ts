import { test } from '../../../fixtures/customFixtures';
import { expect } from '@playwright/test';

test.describe('Auth - Login', () => {
  test('should successfully authenticate a user with valid credentials', async ({ userApiClient, assertionsApi }) => {
    const response = await userApiClient.userLogin('testuser', 'password123');
    await assertionsApi.responseIsOk(response);
    
    const result = await response.json();
    expect(result.message).toBeDefined();
  });
});
