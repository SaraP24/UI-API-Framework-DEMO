import { test } from '../../../fixtures/customFixtures';

test.describe('Auth - Logout', () => {
  test('should successfully log out the current authenticated user', async ({ userApiClient, assertionsApi }) => {
    const response = await userApiClient.userLogout();
    await assertionsApi.responseIsOk(response);
  });
});
