import { test, expect } from '@playwright/test';
import { test as customTest } from '../../../fixtures/customFixtures';
import { IPet } from '../../../interfaces/api';

test.describe('Create and Update Pets', () => {
  customTest('should successfully create a new pet with valid data', async ({ petApi, assertionsApi }) => {
    const newPet: IPet = {
      id: Math.floor(Math.random() * 10000),
      name: 'Test Pet',
      status: 'available'
    };

    const response = await petApi.createPet(newPet);
    await assertionsApi.responseIsOk(response);
    
    const createdPet = await response.json();
    expect(createdPet.id).toBeDefined();
    expect(createdPet.name).toBe(newPet.name);
  });

  customTest('should successfully update an existing pet with new data', async ({ petApi, assertionsApi }) => {
    const updatedPet: IPet = {
      id: 1,
      name: 'Updated Pet Name',
      status: 'pending'
    };

    const response = await petApi.updatePet(updatedPet);
    await assertionsApi.responseIsOk(response);
    
    const result = await response.json();
    expect(result.name).toBe(updatedPet.name);
  });
});
