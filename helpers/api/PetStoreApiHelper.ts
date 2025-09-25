import { APIRequestContext, APIResponse } from 'playwright/test';
import { IPet } from '../../interfaces/api/IPetStatus';
import { BASE_URL, PET_POST_URL, PET_GET_URL, STORE_POST_URL } from '../../endpoints/Routes';
import fs from 'fs/promises';

export default class PetStoreApiHelper {
    constructor(private request: APIRequestContext) { }

    async getRequest(url: string): Promise<APIResponse> {
        return await this.request.get(url);
    }

    async postRequest(url: string, body: object): Promise<APIResponse> {
        return await this.request.post(url, { data: body });
    }

    async putRequest(url: string, body: object): Promise<APIResponse> {
        return await this.request.put(url, { data: body });
    }

    async createPet(pet: IPet): Promise<APIResponse> {
        return await this.postRequest(PET_POST_URL, pet);
    }

    async getPetById(petId: number): Promise<APIResponse> {
        const url = PET_GET_URL.replace('{petId}', petId.toString());
        return await this.request.get(url);
    }

    async getPetsByStatus(status: string): Promise<APIResponse> {
        const url = `${BASE_URL}/pet/findByStatus?status=${status}`;
        return await this.request.get(url);
    }

    async createOrderForPet(petId: number): Promise<APIResponse> {
        const orderData = {
            petId,
            quantity: 1,
            shipDate: new Date().toISOString(),
            status: 'placed',
            complete: true,
        };

        return await this.postRequest(STORE_POST_URL, orderData);
    }

    async deletePet(petId: number): Promise<APIResponse> {
        const url = `${BASE_URL}/pet/${petId}`;
        return await this.request.delete(url);
    }

    async saveJson<T>(filePath: string, data: T): Promise<void> {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    }

    async loadJson<T>(filePath: string): Promise<T> {
        const rawData = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(rawData) as T;
    }
}