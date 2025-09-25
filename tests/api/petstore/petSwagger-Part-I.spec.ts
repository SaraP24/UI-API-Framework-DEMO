import { test } from '../../../fixtures/customFixtures';
import PetStoreApiHelper from '../../../helpers/api/PetStoreApiHelper';
import { pets } from '../../../payloads/NewPetPayload';
import { IPet } from '../../../interfaces/api/IPetStatus';
import { expect } from '@playwright/test';

test('Verify creation of 10 pets with different statuses and validate sold status (with teardown)', async ({ request, assertionsApi }) => {
    const apiHelper = new PetStoreApiHelper(request);

    const createdPetIds: number[] = [];
    const soldPets: IPet[] = [];

    try {
        await test.step('Create pets and validate responses', async () => {
            for (const pet of pets) {
                const response = await apiHelper.createPet(pet);
                await assertionsApi.responseIsOk(response);

                const petData: IPet = await response.json();

                assertionsApi.validatePetSchema(petData);
                
                createdPetIds.push(petData.id);

                if (petData.status === 'sold') {
                    soldPets.push(petData);
                }
            }
        });

        await test.step('Validate that exactly one pet is sold', async () => {
            expect(soldPets.length).toBe(1);
        });

        const soldPet = soldPets[0];

        await test.step('Validate properties of the sold pet', async () => {
            assertionsApi.responseJsonHasProperty(soldPet, 'id');
            assertionsApi.responseJsonHasProperty(soldPet, 'name');
            assertionsApi.responseJsonHasProperty(soldPet, 'status');
        });

        await test.step('Fetch the sold pet by ID and validate response', async () => {
            const response = await apiHelper.getPetById(soldPet.id);
            await assertionsApi.responseIsOk(response);
            await assertionsApi.responseHasValidPet(response);
        });
    } finally {
        // Teardown: delete any created pets to avoid polluting the public Petstore
        for (const id of createdPetIds) {
            try {
                const delResp = await apiHelper.deletePet(id);
                // Some deletions may return 200 or 404 depending on race/previous state; accept both
                const status = delResp.status();
                if (status !== 200 && status !== 404) {
                    console.warn(`Unexpected delete status for pet ${id}: ${status}`);
                }
            } catch (e) {
                console.warn(`Failed to delete pet ${id}: ${e}`);
            }
        }
    }
});
