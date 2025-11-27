import { test, expect } from '@playwright/test';
const baseUrl = 'https://petstore.swagger.io';
const pathName = '/v2';
const pathUrl = '/user/createWithArray';
const endPoint = `${baseUrl}${pathName}${pathUrl}`;

test.describe('Create Multiple Users from Array', () => {
  test('should successfully create multiple users from an array of user data', async ({ request }) => {
    const response = await request.post(`${endPoint}`, {
    });
    expect(response.status()).toBe(200);
  });
});
