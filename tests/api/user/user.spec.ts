import { test, expect } from '@playwright/test';
const baseUrl = 'https://petstore.swagger.io';
const pathName = '/v2';
const pathUrl = '/user';
const endPoint = `${baseUrl}${pathName}${pathUrl}`;

test.describe('Create User', () => {
  test('should successfully create a new user with valid data', async ({ request }) => {
    const response = await request.post(`${endPoint}`, {
    });
    expect(response.status()).toBe(200);
  });
});
