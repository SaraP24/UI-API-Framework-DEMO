import { test } from '../../../../fixtures/BasePetTest';
import { IPet } from '../../../../interfaces/api/IPetStatus';
import { PET_STATUSES } from '../../../../test_data/petstore/petTestData';

test.describe('Pet Store API - Pet Status Management', () => {
    let selectedPets: IPet[] = [];
    const PETS_TO_SELECT = 5;
    
    test('should list and store available pets', async ({ petApi, assertionsApi }) => {
        await test.step('Get pets by status "available"', async () => {
            const response = await petApi.getPetsByStatus(PET_STATUSES.AVAILABLE);
            await assertionsApi.responseIsOk(response);
            
            const allAvailablePets: IPet[] = await response.json();
            await assertionsApi.isGreaterThan(allAvailablePets.length, PETS_TO_SELECT - 1, 
                `Expected at least ${PETS_TO_SELECT} available pets`);
            
            selectedPets = allAvailablePets.slice(0, PETS_TO_SELECT);
        });

        await test.step('Store selected pets for future use', async () => {
            await assertionsApi.isTruthy(
                await petApi.saveJson('test-results/selected-available-pets.json', selectedPets),
                'Failed to save selected pets to file'
            );
        });
    });
    
    test('should validate stored pets are still available', async ({ petApi, assertionsApi }) => {
        const storedPets: IPet[] = await petApi.loadJson('test-results/selected-available-pets.json');
        
        for (const pet of storedPets) {
            await test.step(`Verify pet ${pet.id} status`, async () => {
                const response = await petApi.getPetById(pet.id);
                await assertionsApi.responseIsOk(response);
                
                const currentPet: IPet = await response.json();
                await assertionsApi.assertEqual(
                    currentPet.status,
                    PET_STATUSES.AVAILABLE,
                    `Pet ${pet.id} is no longer available`
                );
            });
        }
    });
});