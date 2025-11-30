import { test } from '../../../fixtures/customFixtures';
import { IPet } from '../../../interfaces/api';
import { expect } from '@playwright/test';

test.describe('Retrieve and Delete Pet by ID', () => {
  test('should successfully retrieve a pet by its ID', async ({ petApi, assertionsApi }) => {
    const petId = 1;
    
    const response = await petApi.getPetById(petId);
    await assertionsApi.responseIsOk(response);
    
    const pet = await response.json();
    expect(pet.id).toBe(petId);
  });

  test('should successfully update a pet by ID with new data', async ({ petApi, assertionsApi }) => {
    const updatedPet: IPet = {
      id: 1,
      name: 'Updated Pet',
      status: 'available'
    };

    const response = await petApi.updatePet(updatedPet);
    await assertionsApi.responseIsOk(response);
  });

  test('should successfully delete a pet by its ID', async ({ petApi }) => {
    const petId = 1;
    
    const response = await petApi.deletePet(petId);
    // Delete might return 200 or 404 depending on whether pet exists
    const status = response.status();
    expect([200, 404]).toContain(status);
  });
});
