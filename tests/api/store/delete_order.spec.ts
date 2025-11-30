import { test } from '../../../fixtures/customFixtures';
import { expect } from '@playwright/test';

test.describe('Create Order', () => {
  test('should successfully create a new order for a pet', async ({ petApiClient, assertionsApi }) => {
    const petId = 1;
    
    const response = await petApiClient.createOrderForPet(petId);
    await assertionsApi.responseIsOk(response);
    
    const order = await response.json();
    expect(order.petId).toBe(petId);
    expect(order.status).toBe('placed');
  });
});
