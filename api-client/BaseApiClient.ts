import { APIRequestContext, APIResponse } from '@playwright/test';
import { IApiClientConfig, IRequestOptions } from '../interfaces/api/IApiClientConfig';
import { ApiException } from '../errors';
import fs from 'fs/promises';
import Config from '../config/Config';

export class BaseApiClient {
    protected baseURL: string;
    protected requestContext: APIRequestContext;
    protected defaultHeaders: Record<string, string>;
    protected timeout: number;
    protected retries: number;

    constructor(config: IApiClientConfig) {
        this.baseURL = Config.PETSTORE_BASE_URL;
        this.requestContext = config.requestContext;
        this.defaultHeaders = config.defaultHeaders || {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        this.timeout = Config.API_REQUEST_TIMEOUT;
        this.retries = Config.API_RETRY_ATTEMPTS;
    }

    protected async request(
        method: string,
        endpoint: string,
        options: IRequestOptions = {}
    ): Promise<APIResponse> {
        const url = this.buildUrl(endpoint);
        const requestOptions = this.buildRequestOptions(options);

        const lastError: Error | null = null;
        for (let attempt = 0; attempt <= this.retries; attempt++) {
            try {
                let response: APIResponse;

                switch (method.toUpperCase()) {
                    case 'GET':
                        response = await this.requestContext.get(url, requestOptions);
                        break;
                    case 'POST':
                        response = await this.requestContext.post(url, requestOptions);
                        break;
                    case 'PUT':
                        response = await this.requestContext.put(url, requestOptions);
                        break;
                    case 'PATCH':
                        response = await this.requestContext.patch(url, requestOptions);
                        break;
                    case 'DELETE':
                        response = await this.requestContext.delete(url, requestOptions);
                        break;
                    default:
                        throw new Error(`Unsupported HTTP method: ${method}`);
                }

                // Validate response status
                if (options.validateStatus !== false && !response.ok()) {
                    const responseBody = await response.text();
                    throw new ApiException(
                        method,
                        endpoint,
                        response.status(),
                        options.data, // request data
                        responseBody, // response data
                        `HTTP ${response.status()}: ${response.statusText()}`
                    );
                }

                return response;
            } catch (error) {
                // If it's already an ApiException, re-throw it
                if (error instanceof ApiException) {
                    throw error;
                }
            }
        }
        throw lastError || new Error('Unknown error occurred during API request');
    }

    protected buildUrl(endpoint: string): string {
        const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
        return `${this.baseURL}${cleanEndpoint}`;
    }

    protected buildRequestOptions(options: IRequestOptions): Record<string, any> {
        const requestOptions: Record<string, any> = {
            headers: { ...this.defaultHeaders, ...options.headers },
            timeout: options.timeout || this.timeout
        };

        if (options.params) {
            const searchParams = new URLSearchParams();
            Object.entries(options.params).forEach(([key, value]) => {
                searchParams.append(key, String(value));
            });
            requestOptions.params = searchParams;
        }

        if (options.data) {
            requestOptions.data = options.data;
        }

        return requestOptions;
    }

    protected async mockResponse(endpoint: string, method: string): Promise<APIResponse> {
        return {
            status: () => 200,
            ok: () => true,
            json: async () => ({ message: `Mocked ${method} response for ${endpoint}` })
        } as unknown as APIResponse;
    }

    // Utility methods for common HTTP methods
    protected async get(endpoint: string, options?: IRequestOptions): Promise<APIResponse> {
        return this.request('GET', endpoint, options);
    }

    protected async post(endpoint: string, data?: any, options: IRequestOptions = {}): Promise<APIResponse> {
        return this.request('POST', endpoint, { ...options, data });
    }

    protected async put(endpoint: string, data?: any, options: IRequestOptions = {}): Promise<APIResponse> {
        return this.request('PUT', endpoint, { ...options, data });
    }

    protected async patch(endpoint: string, data?: any, options: IRequestOptions = {}): Promise<APIResponse> {
        return this.request('PATCH', endpoint, { ...options, data });
    }

    protected async delete(endpoint: string, options?: IRequestOptions): Promise<APIResponse> {
        return this.request('DELETE', endpoint, options);
    }

    async saveJson<T>(filePath: string, data: T): Promise<void> {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    }

    async loadJson<T>(filePath: string): Promise<T> {
        const rawData = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(rawData) as T;
    }
}