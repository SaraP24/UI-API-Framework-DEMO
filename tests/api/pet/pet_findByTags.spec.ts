import { test, expect } from '@playwright/test';
const baseUrl = 'https://petstore.swagger.io';
const pathName = '/v2';
const pathUrl = '/pet/findByTags';
const endPoint = `${baseUrl}${pathName}${pathUrl}`;

test.describe('Find Pets by Tags', () => {
  test('should successfully retrieve pets filtered by tags', async ({ request }) => {
    const response = await request.get(`${endPoint}`, {
      params: {tags:"example"},
    });
    expect(response.status()).toBe(200);
  });
});
