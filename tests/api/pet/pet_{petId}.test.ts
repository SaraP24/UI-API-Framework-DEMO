import { test, expect } from '@playwright/test';
const baseUrl = 'https://petstore.swagger.io';
const pathName = '/v2';
const pathUrl = '/pet/example';
const endPoint = `${baseUrl}${pathName}${pathUrl}`;

test.describe('pet /pet/{petId}', () => {
  test('GET: Should return success', async ({ request }) => {
    const response = await request.get(`${endPoint}`, {
      params: {petId:"example"},
    });
    expect(response.status()).toBe(200);
  });

  test('POST: Should return success', async ({ request }) => {
    const response = await request.post(`${endPoint}`, {
      params: {petId:"example"},
    });
    expect(response.status()).toBe(200);
  });

  test('DELETE: Should return success', async ({ request }) => {
    const response = await request.delete(`${endPoint}`, {
      headers: { api_key: "example" },
      params: {petId:"example"},
    });
    expect(response.status()).toBe(200);
  });
});
