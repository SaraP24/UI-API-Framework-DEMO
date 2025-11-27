import { test } from '../../../fixtures/BasePetTest';

test.describe('Find Pets by Status', () => {
  test('should successfully retrieve pets filtered by their status', async ({ petApi, assertionsApi }) => {
    const response = await petApi.getPetsByStatus('example');
    await assertionsApi.responseIsOk(response);
  });
});
