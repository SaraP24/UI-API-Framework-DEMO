import { test, expect } from '@playwright/test';
const baseUrl = 'https://petstore.swagger.io';
const pathName = '/v2';
const pathUrl = '/user/example';
const endPoint = `${baseUrl}${pathName}${pathUrl}`;

test.describe('user /user/{username}', () => {
  test('GET: Should return success', async ({ request }) => {
    const response = await request.get(`${endPoint}`, {
      params: {username:"example"},
    });
    expect(response.status()).toBe(200);
  });

  test('PUT: Should return success', async ({ request }) => {
    const response = await request.put(`${endPoint}`, {
      params: {username:"example"},
    });
    expect(response.status()).toBe(200);
  });

  test('DELETE: Should return success', async ({ request }) => {
    const response = await request.delete(`${endPoint}`, {
      params: {username:"example"},
    });
    expect(response.status()).toBe(200);
  });
});
