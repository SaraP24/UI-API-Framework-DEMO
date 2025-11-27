import { test, expect } from '@playwright/test';
const baseUrl = 'https://petstore.swagger.io';
const pathName = '/v2';
const pathUrl = '/pet/example/uploadImage';
const endPoint = `${baseUrl}${pathName}${pathUrl}`;

test.describe('Upload Pet Image', () => {
  test('should successfully upload an image for a pet by pet ID', async ({ request }) => {
    const response = await request.post(`${endPoint}`, {
      params: {petId:"example"},
    });
    expect(response.status()).toBe(200);
  });
});
