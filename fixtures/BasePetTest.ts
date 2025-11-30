import { test as base } from './customFixtures';
import { PetStoreApiClient } from '../api-client/PetStoreApiClient';
import { IApiClientConfig } from '../interfaces/api/IApiClientConfig';
import { Config } from '../config/Config';

type PetTestFixtures = {
    petApi: PetStoreApiClient;
    cleanupPets: (petIds: number[]) => Promise<void>;
};

export const test = base.extend<PetTestFixtures>({
    petApi: async ({ request }, use) => {
        const config: IApiClientConfig = {
            baseURL: Config.PETSTORE_BASE_URL,
            requestContext: request,
            defaultHeaders: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...(Config.PETSTORE_API_TOKEN ? { Authorization: `Bearer ${Config.PETSTORE_API_TOKEN}` } : {})
            },
            retries: Config.API_RETRY_ATTEMPTS,
        };

        const client = new PetStoreApiClient(config);
        await use(client);
    },

    cleanupPets: async ({ petApi }, use) => {
        const createdPetIds: number[] = [];

        await use(async (petIds: number[]) => {
            createdPetIds.push(...petIds);
        });

        // Cleanup after test
        for (const id of createdPetIds) {
            try {
                const response = await petApi.deletePet(id);
                const status = response.status();
                if (status !== 200 && status !== 404) {
                    console.warn(`Unexpected delete status for pet ${id}: ${status}`);
                }
            } catch (e) {
                console.warn(`Failed to delete pet ${id}: ${e}`);
            }
        }
    }
});