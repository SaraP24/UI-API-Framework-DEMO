import { test } from '../../../../fixtures/BasePetTest';

test.describe('pet /pet/findByStatus', () => {
  test('GET: Should return success', async ({ petApi, assertionsApi }) => {
    const response = await petApi.getPetsByStatus('example');
    await assertionsApi.responseIsOk(response);
  });
});
