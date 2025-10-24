import { test } from '../../../../fixtures/customFixtures';
import PetStoreApiHelper from '../../../../assertions/PetStoreApiHelper';
import { IPet, IOrder } from '../../../../interfaces/api/IPetStatus';
import fs from 'fs/promises';

test('Create an order for each of the 5 selected pets and validate responses', async ({ request, assertionsApi }) => {
    let selectedPets: IPet[] = [];
    const placedOrders: IOrder[] = [];
    const apiHelper = new PetStoreApiHelper(request);
    
    selectedPets = await apiHelper.loadJson<IPet[]>('availablePetsRetrieved.json');

    if (selectedPets.length === 0) throw new Error('Not stored pets available');

    await test.step('Place orders for 5 stored pets', async () => {
        for (const pet of selectedPets) {
            const orderResponse = await apiHelper.createOrderForPet(pet.id);
            const orderResponseData = await orderResponse.json();

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