import { test } from '../../../../fixtures/BasePetTest';
import { pets } from '../../../../payloads/NewPetPayload';
import { IPet } from '../../../../interfaces/api/IPetStatus';
import { expect } from '@playwright/test';

test('Verify creation of 10 pets with different statuses and validate sold status (with teardown)', async ({ petApi, assertionsApi, cleanupPets }) => {
    const createdPetIds: number[] = [];
    const soldPets: IPet[] = [];

    try {
        await test.step('Create pets and validate responses', async () => {
            for (const pet of pets) {
                const response = await petApi.createPet(pet);
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
            const response = await petApi.getPetById(soldPet.id);
            await assertionsApi.responseIsOk(response);
            await assertionsApi.responseHasValidPet(response);
        });
    } finally {
        // Teardown: delete any created pets to avoid polluting the public Petstore
        await cleanupPets(createdPetIds);
    }
});
