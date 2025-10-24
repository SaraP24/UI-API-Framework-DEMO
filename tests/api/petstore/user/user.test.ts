import { test, expect } from '@playwright/test';
const baseUrl = 'https://petstore.swagger.io';
const pathName = '/v2';
const pathUrl = '/user';
const endPoint = `${baseUrl}${pathName}${pathUrl}`;

test.describe('user /user', () => {
  test('POST: Should return success', async ({ request }) => {
    const response = await request.post(`${endPoint}`, {
    });
    expect(response.status()).toBe(200);
  });
});
