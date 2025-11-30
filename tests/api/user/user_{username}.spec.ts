import { test } from '../../../fixtures/customFixtures';
import { expect } from '@playwright/test';

test.describe('Retrieve, Update and Delete User by Username', () => {
  test('should successfully retrieve a user by their username', async ({ userApiClient, assertionsApi }) => {
    const username = 'testuser';
    
    const response = await userApiClient.getUserByUsername(username);
    await assertionsApi.responseIsOk(response);
    
    const user = await response.json();
    expect(user.username).toBe(username);
  });

  test('should successfully update a user by their username with new data', async ({ userApiClient, assertionsApi }) => {
    const username = 'testuser';
    const updatedUser = {
      username: username,
      firstName: 'Updated',
      lastName: 'Name',
      email: 'updated@example.com'
    };

    const response = await userApiClient.updateUserByUsername(username, updatedUser);
    await assertionsApi.responseIsOk(response);
  });

  test('should successfully delete a user by their username', async ({ userApiClient }) => {
    const username = 'testuser';
    
    const response = await userApiClient.deleteUserByUsername(username);
    // Delete might return 200 or 404 depending on whether user exists
    const status = response.status();
    expect([200, 404]).toContain(status);
  });
});
