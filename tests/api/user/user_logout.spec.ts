import { test, expect } from '@playwright/test';
const baseUrl = 'https://petstore.swagger.io';
const pathName = '/v2';
const pathUrl = '/user/logout';
const endPoint = `${baseUrl}${pathName}${pathUrl}`;

test.describe('Logout', () => {
  test('should successfully log out the current authenticated user', async ({ request }) => {
    const response = await request.get(`${endPoint}`, {
    });
    expect(response.status()).toBe(200);
  });
});
