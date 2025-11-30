import { APIResponse } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';
import { IPet } from '../interfaces/api';
import { Routes } from '../endpoints';

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
        // eslint-disable-next-line @typescript-eslint/no-require-imports
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

    /**
     * Get store inventory
     * @returns APIResponse with inventory data
     */
    async getInventory(): Promise<APIResponse> {
        return this.get('/store/inventory');
    }

    /**
     * Get order by ID
     * @param orderId ID of the order to fetch
     * @returns APIResponse with order data
     */
    async getOrderById(orderId: number): Promise<APIResponse> {
        return this.get(`/store/order/${orderId}`);
    }

    /**
     * Delete order by ID
     * @param orderId ID of the order to delete
     * @returns APIResponse
     */
    async deleteOrder(orderId: number): Promise<APIResponse> {
        return this.delete(`/store/order/${orderId}`);
    }

    /**
     * User login
     * @param username Username
     * @param password Password
     * @returns APIResponse
     */
    async userLogin(username: string, password: string): Promise<APIResponse> {
        return this.get('/user/login', {
            params: { username, password }
        });
    }

    /**
     * User logout
     * @returns APIResponse
     */
    async userLogout(): Promise<APIResponse> {
        return this.get('/user/logout');
    }

    /**
     * Create a new user
     * @param user User data
     * @returns APIResponse
     */
    async createUser(user: any): Promise<APIResponse> {
        return this.post('/user', user);
    }

    /**
     * Create multiple users from array
     * @param users Array of user data
     * @returns APIResponse
     */
    async createUsersWithArray(users: any[]): Promise<APIResponse> {
        return this.post('/user/createWithArray', users);
    }

    /**
     * Create multiple users from list
     * @param users List of user data
     * @returns APIResponse
     */
    async createUsersWithList(users: any[]): Promise<APIResponse> {
        return this.post('/user/createWithList', users);
    }

    /**
     * Get user by username
     * @param username Username
     * @returns APIResponse
     */
    async getUserByUsername(username: string): Promise<APIResponse> {
        return this.get(`/user/${username}`);
    }

    /**
     * Update user by username
     * @param username Username
     * @param user New user data
     * @returns APIResponse
     */
    async updateUserByUsername(username: string, user: Record<string, unknown>): Promise<APIResponse> {
        return this.put(`/user/${username}`, user);
    }

    /**
     * Delete user by username
     * @param username Username
     * @returns APIResponse
     */
    async deleteUserByUsername(username: string): Promise<APIResponse> {
        return this.delete(`/user/${username}`);
    }

}