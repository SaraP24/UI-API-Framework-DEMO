import { APIResponse } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';
import { IPet } from '../interfaces/api';
import { Routes } from '../endpoints';

export interface IPetApiResponse<T = any> {
    data: T;
    status: number;
    ok: boolean;
}

export class PetStoreApiClient extends BaseApiClient {
    /**
     * Create a new pet
     * @param pet Pet data to create
     * @returns APIResponse with created pet data
     */
    async createPet(pet: IPet): Promise<APIResponse> {
        return this.post(Routes.PET_CREATE, pet);
    }

    /**
     * Get pet by ID
     * @param petId ID of the pet to fetch
     * @returns APIResponse with pet data
     */
    async getPetById(petId: number): Promise<APIResponse> {
        return this.get(Routes.PET_GET_BY_ID.replace('{petId}', petId.toString()));
    }

    /**
     * Get pets by status
     * @param status Status to filter by ('available', 'pending', 'sold')
     * @returns APIResponse with array of pets
     */
    async getPetsByStatus(status: string): Promise<APIResponse> {
        return this.get(Routes.PET_FIND_BY_STATUS, {
            params: { status }
        });
    }

    /**
     * Update an existing pet
     * @param pet Pet data to update
     * @returns APIResponse with updated pet data
     */
    async updatePet(pet: IPet): Promise<APIResponse> {
        return this.put(Routes.PET_UPDATE, pet);
    }

    /**
     * Delete a pet
     * @param petId ID of the pet to delete
     * @returns APIResponse
     */
    async deletePet(petId: number): Promise<APIResponse> {
        return this.delete(Routes.PET_DELETE.replace('{petId}', petId.toString()));
    }

    /**
     * Upload pet image
     * @param petId ID of the pet
     * @param imagePath Path to the image file
     * @returns APIResponse
     */
    async uploadPetImage(petId: number, imagePath: string): Promise<APIResponse> {
        const formData = new FormData();
        formData.append('file', await this.readFileAsBlob(imagePath));
        
        return this.post(
            Routes.PET_UPLOAD_IMAGE.replace('{petId}', petId.toString()),
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
    }

    /**
     * Find pets by tags
     * @param tags Array of tags to filter by
     * @returns APIResponse with array of pets
     */
    async findPetsByTags(tags: string[]): Promise<APIResponse> {
        return this.get(Routes.PET_FIND_BY_TAGS, {
            params: { tags: tags.join(',') }
        });
    }

    private async readFileAsBlob(filePath: string): Promise<Blob> {
        const fs = require('fs').promises;
        const buffer = await fs.readFile(filePath);
        return new Blob([buffer]);
    }

    async createOrderForPet(petId: number): Promise<APIResponse> {
        return this.post('/store/order', {
            data: {
                petId: petId,
                quantity: 1,
                shipDate: new Date().toISOString(),
                status: 'placed',
                complete: true
            }
        });
    }
    
}