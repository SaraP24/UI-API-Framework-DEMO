import { APIRequestContext, APIResponse, expect } from "playwright/test";

export default class ApiAssertions {
    constructor(request: APIRequestContext) {
        request = request;
    }
    async responseIsOk(response: APIResponse) {
        const statusCode = response.status();
        expect(statusCode, `Response is not 200, status code received: ${statusCode}`).toBe(200);
    }

    async responseHasProperty(response: APIResponse, expectedProperty: string) {
        const responseData = await response.json();
        expect(responseData, `Expected property to be "${expectedProperty}", but got "${responseData.property}"`).toHaveProperty(expectedProperty);
    }

    async responseContainsStatuses(response: any, expectedStatuses: string[]) {
        if (!response || !('status' in response)) {
            throw new Error(`'status' not found in response: ${JSON.stringify(response, null, 2)}`);
        }
        expect(expectedStatuses).toContain(response.status);
    }

    async responseContainsValue(response: APIResponse, property: string, value: any): Promise<void> {
        const data = await response.json();
        expect(data[property]).toBe(value);
    }

    async responseLenghtIsEqualTo(response: any, lenght: number) {
        expect(response.length).toBe(lenght);
    }

    responseJsonHasProperty(obj: any, property: string) {
        expect(obj).toHaveProperty(property);
    }
}