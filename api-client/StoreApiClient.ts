import { APIResponse } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';
import { IPet } from '../interfaces/api';
import { Routes } from '../endpoints';

export class StoreApiClient extends BaseApiClient {

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
}