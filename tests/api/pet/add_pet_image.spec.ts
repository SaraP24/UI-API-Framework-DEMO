import { test } from '../../../fixtures/customFixtures';

test.describe('Upload Pet Image', () => {
  test('should successfully upload an image for a pet by pet ID', async ({ petApiClient, assertionsApi }) => {
    const petId = 1;

    const response = await petApiClient.uploadPetImage(petId, './breathtaking_landscape-wallpaper-1920x1080.jpg');
    await assertionsApi.responseIsOk(response);
  });
});
