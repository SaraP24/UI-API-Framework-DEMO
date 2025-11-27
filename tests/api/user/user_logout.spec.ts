import { test } from '../../../fixtures/customFixtures';

test.describe('Auth - Logout', () => {
  test('should successfully log out the current authenticated user', async ({ petApi, assertionsApi }) => {
    const response = await petApi.userLogout();
    await assertionsApi.responseIsOk(response);
  });
});
