import { test } from '../../../fixtures/customFixtures';
import { expect } from '@playwright/test';

test.describe('Get Store Inventory', () => {
  test('should successfully retrieve the current store inventory', async ({ storeApiClient, assertionsApi }) => {
    const response = await storeApiClient.getInventory();
    await assertionsApi.responseIsOk(response);
    
    const inventory = await response.json();
    expect(typeof inventory).toBe('object');
  });
});
