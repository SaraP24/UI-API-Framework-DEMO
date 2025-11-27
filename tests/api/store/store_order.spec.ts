import { test, expect } from '@playwright/test';
const baseUrl = 'https://petstore.swagger.io';
const pathName = '/v2';
const pathUrl = '/store/order/example';
const endPoint = `${baseUrl}${pathName}${pathUrl}`;

test.describe('Retrieve and Delete Orders by ID', () => {
  test('should successfully retrieve an order by its ID', async ({ request }) => {
    const response = await request.get(`${endPoint}`, {
      params: {orderId:"example"},
    });
    expect(response.status()).toBe(200);
  });

  test('should successfully delete an order by its ID', async ({ request }) => {
    const response = await request.delete(`${endPoint}`, {
      params: {orderId:"example"},
    });
    expect(response.status()).toBe(200);
  });
});
