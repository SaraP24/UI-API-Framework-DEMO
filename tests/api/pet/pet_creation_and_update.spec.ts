import { test, expect } from '@playwright/test';
const baseUrl = 'https://petstore.swagger.io';
const pathName = '/v2';
const pathUrl = '/pet';
const endPoint = `${baseUrl}${pathName}${pathUrl}`;

test.describe('Create and Update Pets', () => {
  test('should successfully create a new pet with valid data', async ({ request }) => {
    const response = await request.post(`${endPoint}`, {
    });
    expect(response.status()).toBe(200);
  });

  test('should successfully update an existing pet with new data', async ({ request }) => {
    const response = await request.put(`${endPoint}`, {
    });
    expect(response.status()).toBe(200);
  });
});
