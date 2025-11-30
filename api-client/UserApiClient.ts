import { APIResponse } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';
import { IPet } from '../interfaces/api';
import { Routes } from '../endpoints';

export class UserApiClient extends BaseApiClient {

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