import { expect } from '@playwright/test';
import { test } from '../../fixtures/customFixtures';
import PetStoreApiHelper from '../../helpers/api/PetStoreApiHelper';
import { pets } from '../../payloads/NewPetPayload';
import { IPet } from '../../interfaces/api/IPetStatus';

test('Verify creation of 10 pets with different statuses and validate sold status', async ({ request, assertionsApi }) => {
    const apiHelper = new PetStoreApiHelper(request);

    const createdPets: IPet[] = [];
    const soldPets: IPet[] = [];

    await test.step('Create pets and validate responses', async () => {
        for (const pet of pets) {
            const response = await apiHelper.createPet(pet);
            await assertionsApi.responseIsOk(response);
            
            console.log(await response.text());

            const petData: IPet = await response.json();
            await assertionsApi.responseContainsStatuses(petData, ['available', 'pending', 'sold']);
            createdPets.push(petData);

            if (petData.status === 'sold') {
                soldPets.push(petData);
            }
        }
    });

    await test.step('Validate that exactly one pet is sold', async () => {
        await assertionsApi.responseLenghtIsEqualTo(soldPets, 1);
    });

    const soldPet = soldPets[0];

    await test.step('Validate properties of the sold pet', async () => {
        assertionsApi.responseJsonHasProperty(soldPet, 'id');
        assertionsApi.responseJsonHasProperty(soldPet, 'name');
        assertionsApi.responseJsonHasProperty(soldPet, 'status');
    });

    await test.step('Fetch the sold pet by ID and validate response', async () => {
        const response = await apiHelper.getPetById(soldPet.id);
        const petDetails = await response.json();
        await assertionsApi.responseIsOk(response);
        
        console.log('Details of sold pet retrieved:', petDetails);
    });
});
