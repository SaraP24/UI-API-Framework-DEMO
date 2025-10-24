import { test, expect } from '@playwright/test';
const baseUrl = 'https://petstore.swagger.io';
const pathName = '/v2';
const pathUrl = '/pet';
const endPoint = `${baseUrl}${pathName}${pathUrl}`;

test.describe('pet /pet', () => {
  test('POST: Should return success', async ({ request }) => {
    const response = await request.post(`${endPoint}`, {
    });
    expect(response.status()).toBe(200);
  });

  test('PUT: Should return success', async ({ request }) => {
    const response = await request.put(`${endPoint}`, {
    });
    expect(response.status()).toBe(200);
  });
});
