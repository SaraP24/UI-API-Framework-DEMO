import { test, expect } from '@playwright/test';
const baseUrl = 'https://petstore.swagger.io';
const pathName = '/v2';
const pathUrl = '/store/order/example';
const endPoint = `${baseUrl}${pathName}${pathUrl}`;

test.describe('store /store/order/{orderId}', () => {
  test('GET: Should return success', async ({ request }) => {
    const response = await request.get(`${endPoint}`, {
      params: {orderId:"example"},
    });
    expect(response.status()).toBe(200);
  });

  test('DELETE: Should return success', async ({ request }) => {
    const response = await request.delete(`${endPoint}`, {
      params: {orderId:"example"},
    });
    expect(response.status()).toBe(200);
  });
});
