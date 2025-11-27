import { test, expect } from '@playwright/test';
const baseUrl = 'https://petstore.swagger.io';
const pathName = '/v2';
const pathUrl = '/pet/example';
const endPoint = `${baseUrl}${pathName}${pathUrl}`;

test.describe('Retrieve and Delete Pet by ID', () => {
  test('should successfully retrieve a pet by its ID', async ({ request }) => {
    const response = await request.get(`${endPoint}`, {
      params: {petId:"example"},
    });
    expect(response.status()).toBe(200);
  });

  test('should successfully update a pet by ID with new data', async ({ request }) => {
    const response = await request.post(`${endPoint}`, {
      params: {petId:"example"},
    });
    expect(response.status()).toBe(200);
  });

  test('should successfully delete a pet by its ID', async ({ request }) => {
    const response = await request.delete(`${endPoint}`, {
      headers: { api_key: "example" },
      params: {petId:"example"},
    });
    expect(response.status()).toBe(200);
  });
});
