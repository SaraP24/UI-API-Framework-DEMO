import { test, expect } from '@playwright/test';
const baseUrl = 'https://petstore.swagger.io';
const pathName = '/v2';
const pathUrl = '/pet/example/uploadImage';
const endPoint = `${baseUrl}${pathName}${pathUrl}`;

test.describe('pet /pet/{petId}/uploadImage', () => {
  test('POST: Upload image by pet id', async ({ request }) => {
    const response = await request.post(`${endPoint}`, {
      params: {petId:"example"},
    });
    expect(response.status()).toBe(200);
  });
});
