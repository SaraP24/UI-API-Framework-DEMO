import { test, expect } from '@playwright/test';
const baseUrl = 'https://petstore.swagger.io';
const pathName = '/v2';
const pathUrl = '/user/example';
const endPoint = `${baseUrl}${pathName}${pathUrl}`;

test.describe('Retrieve, Update and Delete User by Username', () => {
  test('should successfully retrieve a user by their username', async ({ request }) => {
    const response = await request.get(`${endPoint}`, {
      params: {username:"example"},
    });
    expect(response.status()).toBe(200);
  });

  test('should successfully update a user by their username with new data', async ({ request }) => {
    const response = await request.put(`${endPoint}`, {
      params: {username:"example"},
    });
    expect(response.status()).toBe(200);
  });

  test('should successfully delete a user by their username', async ({ request }) => {
    const response = await request.delete(`${endPoint}`, {
      params: {username:"example"},
    });
    expect(response.status()).toBe(200);
  });
});
