import { test, expect } from '@playwright/test';
const baseUrl = 'https://petstore.swagger.io';
const pathName = '/v2';
const pathUrl = '/store/order';
const endPoint = `${baseUrl}${pathName}${pathUrl}`;

test.describe('Create Order', () => {
  test('should successfully create a new order for a pet', async ({ request }) => {
    const response = await request.post(`${endPoint}`, {
    });
    expect(response.status()).toBe(200);
  });
});
