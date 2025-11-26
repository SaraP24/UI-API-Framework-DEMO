import { test, expect } from '@playwright/test';
const baseUrl = 'https://petstore.swagger.io';
const pathName = '/v2';
const pathUrl = '/user/login';
const endPoint = `${baseUrl}${pathName}${pathUrl}`;

test.describe('user /user/login', () => {
  test('GET: Should return success', async ({ request }) => {
    const response = await request.get(`${endPoint}`, {
      params: {username:"example",password:"example"},
    });
    expect(response.status()).toBe(200);
  });
});
