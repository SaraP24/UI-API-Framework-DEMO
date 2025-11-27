import { test, expect } from '@playwright/test';
const baseUrl = 'https://petstore.swagger.io';
const pathName = '/v2';
const pathUrl = '/user/createWithList';
const endPoint = `${baseUrl}${pathName}${pathUrl}`;

test.describe('Create Multiple Users from List', () => {
  test('should successfully create multiple users from a list of user data', async ({ request }) => {
    const response = await request.post(`${endPoint}`, {
    });
    expect(response.status()).toBe(200);
  });
});
