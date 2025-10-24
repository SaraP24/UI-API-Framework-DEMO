import { test, expect } from '@playwright/test';
const baseUrl = 'https://petstore.swagger.io';
const pathName = '/v2';
const pathUrl = '/pet/findByTags';
const endPoint = `${baseUrl}${pathName}${pathUrl}`;

test.describe('pet /pet/findByTags', () => {
  test('GET: Should return success', async ({ request }) => {
    const response = await request.get(`${endPoint}`, {
      params: {tags:"example"},
    });
    expect(response.status()).toBe(200);
  });
});
