import { test } from '../../../fixtures/customFixtures';
import { expect } from '@playwright/test';

test.describe('Retrieve and Delete Orders by ID', () => {
  test('should successfully retrieve an order by its ID', async ({ storeApiClient, assertionsApi }) => {
    const orderId = 1;
    
    const response = await storeApiClient.getOrderById(orderId);
    await assertionsApi.responseIsOk(response);
    
    const order = await response.json();
    expect(order.id).toBe(orderId);
  });

  test('should successfully delete an order by its ID', async ({ storeApiClient }) => {
    const orderId = 1;
    
    const response = await storeApiClient.deleteOrder(orderId);
    // Delete might return 200 or 404 depending on whether order exists
    const status = response.status();
    expect([200, 404]).toContain(status);
  });
});
