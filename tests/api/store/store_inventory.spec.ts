import { test, expect } from '@playwright/test';
const baseUrl = 'https://petstore.swagger.io';
const pathName = '/v2';
const pathUrl = '/store/inventory';
const endPoint = `${baseUrl}${pathName}${pathUrl}`;

test.describe('Get Inventory', () => {
  test('should successfully retrieve the current store inventory', async ({ request }) => {
    const response = await request.get(`${endPoint}`, {
    });
    expect(response.status()).toBe(200);
  });
});
