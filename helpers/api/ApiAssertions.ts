import { APIRequestContext, APIResponse, expect } from "playwright/test";
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import petSchema from '../../schemas/pet.schema.json';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validatePet = ajv.compile(petSchema as object);

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

    // Basic schema validation for a Pet object
    validatePetSchema(obj: any) {
        expect(typeof obj).toBe('object');
        expect(typeof obj.id).toBe('number');
        expect(typeof obj.name).toBe('string');
        expect(['available', 'pending', 'sold']).toContain(obj.status);
    }

    async responseHasValidPet(response: APIResponse) {
        const data = await response.json();
        this.validatePetSchema(data);
        // also run AJV schema validation for stricter checks
        const valid = validatePet(data);
        if (!valid) {
            const errors = validatePet.errors;
            throw new Error(`Pet schema validation failed: ${JSON.stringify(errors, null, 2)}`);
        }
    }

    validatePetWithSchema(obj: any) {
        const valid = validatePet(obj);
        if (!valid) {
            throw new Error(`Pet schema validation failed: ${JSON.stringify(validatePet.errors, null, 2)}`);
        }
    }
}