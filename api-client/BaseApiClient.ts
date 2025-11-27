import { APIRequestContext, APIResponse } from '@playwright/test';
import { IApiClientConfig, IRequestOptions } from '../interfaces/api/IApiClientConfig';
import { ApiException } from '../src/errors';
import fs from 'fs/promises';

export class BaseApiClient {
    protected baseURL: string;
    protected requestContext: APIRequestContext;
    protected defaultHeaders: Record<string, string>;
    protected timeout: number;
    protected retries: number;
    protected offline: boolean;

    constructor(config: IApiClientConfig) {
        this.baseURL = config.baseURL;
        this.requestContext = config.requestContext;
        this.defaultHeaders = config.defaultHeaders || {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        this.timeout = config.timeout || 30000;
        this.retries = config.retries || 0;
        this.offline = config.offline || false;
    }

    protected async request(
        method: string,
        endpoint: string,
        options: IRequestOptions = {}
    ): Promise<APIResponse> {
        if (this.offline) {
            return this.mockResponse(endpoint, method);
        }

        const url = this.buildUrl(endpoint);
        const requestOptions = this.buildRequestOptions(options);
        
        let lastError: Error | null = null;
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

                lastError = error as Error;
                if (attempt < this.retries) {
                    const delayMs = Math.pow(2, attempt) * 1000; // Exponential backoff
                    console.warn(`⚠️  Retry attempt ${attempt + 1}/${this.retries} after ${delayMs}ms`);
                    await this.delay(delayMs);
                }
            }
        }
        
        // Throw final error as ApiException
        if (lastError) {
            throw new ApiException(
                method,
                endpoint,
                0, // Status code unknown for network errors
                options.data,
                lastError.message,
                `Failed after ${this.retries + 1} attempts: ${lastError.message}`
            );
        }

        // Should never reach here, but keep type safety
        throw new ApiException(
            method,
            endpoint,
            0,
            options.data,
            undefined,
            'Unknown error occurred'
        );
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
        console.warn(`📴 Offline mode: Mocking ${method} ${endpoint}`);
        return {
            status: () => 200,
            ok: () => true,
            json: async () => ({ message: `Mocked ${method} response for ${endpoint}` })
        } as unknown as APIResponse;
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
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