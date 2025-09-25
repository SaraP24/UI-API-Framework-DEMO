import { test } from '../../../fixtures/customFixtures';
import PetStoreApiHelper from '../../../helpers/api/PetStoreApiHelper';
import { IPet, IOrder } from '../../../interfaces/api/IPetStatus';
import fs from 'fs/promises';

test.describe.serial('Pet Store API - Parte II', () => {
    let selectedPets: IPet[] = [];
    const placedOrders: IOrder[] = [];

    test('List available pets', async ({ request, assertionsApi }) => {
        const apiHelper = new PetStoreApiHelper(request);

        await test.step('Get pets by status "available" and store 5 in data structure', async () => {
            const response = await apiHelper.getPetsByStatus('available');
            await assertionsApi.responseIsOk(response);
            const allAvailablePets: IPet[] = await response.json();
            if (allAvailablePets.length < 5) {
                throw new Error(`Expected at least 5 available pets, but got ${allAvailablePets.length}`);
            }
            selectedPets = allAvailablePets.slice(50, 55);
        });

        await test.step('Store available pets for next test', async () => {
            await apiHelper.saveJson('availablePetsRetrieved.json', selectedPets);
        });
    });

    test('Create an order for each of the 5 selected pets and validate responses', async ({ request, assertionsApi }) => {
        const apiHelper = new PetStoreApiHelper(request);
        selectedPets = await apiHelper.loadJson<IPet[]>('availablePetsRetrieved.json');

        if (selectedPets.length === 0) throw new Error('Not stored pets available');

        await test.step('Place orders for 5 stored pets', async () => {
            for (const pet of selectedPets) {
                const orderResponse = await apiHelper.createOrderForPet(pet.id);
                const orderResponseData: IOrder = await orderResponse.json();

                console.log('Order Response Data:', orderResponseData);

                await assertionsApi.responseContainsStatuses(orderResponseData, ['placed']);
                placedOrders.push(orderResponseData);
            }


            console.log('Pets from JSON:', selectedPets.map(p => p.id));
        });

        await test.step('Store placed orders in JSON file', async () => {
            await fs.writeFile('placedOrders.json', JSON.stringify(placedOrders, null, 2));
        });
    });
});