import { APIRequestContext } from '@playwright/test';

export interface IApiClientConfig {
    baseURL: string;
    requestContext: APIRequestContext;
    defaultHeaders?: Record<string, string>;
    timeout?: number;
    retries?: number;
}

export interface IRequestOptions {
    headers?: Record<string, string>;
    params?: Record<string, string | number | boolean>;
    data?: any;
    timeout?: number;
    validateStatus?: boolean;
}