import { test } from '../../../fixtures/customFixtures';
import { expect } from '@playwright/test';

test.describe('Find Pets by Tags', () => {
  test('should successfully retrieve pets filtered by tags', async ({ petApi, assertionsApi }) => {
    const tags = ['dog', 'friendly'];
    
    const response = await petApi.findPetsByTags(tags);
    await assertionsApi.responseIsOk(response);
    
    const pets = await response.json();
    expect(Array.isArray(pets)).toBeTruthy();
  });
});
