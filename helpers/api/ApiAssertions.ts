import { APIRequestContext, APIResponse, expect } from "playwright/test";
import Ajv, { SchemaObject } from 'ajv';
import addFormats from 'ajv-formats';
import fs from 'fs';
import path from 'path';
import { IPet } from "../../interfaces/api/IPetStatus";

const schemaPath = path.resolve(process.cwd(), 'schemas', 'pet.schema.json');
const petSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validatePet = ajv.compile(petSchema as object);

export default class ApiAssertions {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }
    async responseIsOk(response: APIResponse) {
        const statusCode = response.status();
        expect(statusCode, `Response is not 200, status code received: ${statusCode}`).toBe(200);
    }

    async responseHasProperty(response: APIResponse, expectedProperty: string) {
        const responseData = await response.json();
        expect(responseData, `Expected property to be "${expectedProperty}", but got "${responseData.property}"`).toHaveProperty(expectedProperty);
    }

    async responseContainsStatuses(response: APIResponse, expectedStatuses: string[]) {
        const status = response.status();
        expect(expectedStatuses).toContain(status);
    }

    async responseContainsValue(response: APIResponse, property: string, value: number): Promise<void> {
        const data = await response.json();
        expect(data[property]).toBe(value);
    }

    responseJsonHasProperty(obj: object, property: string) {
        expect(obj).toHaveProperty(property);
    }

    // Basic schema validation for a Pet object
    validatePetSchema(obj: IPet) {
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

    validatePetWithSchema(obj: SchemaObject) {
        const valid = validatePet(obj);
        if (!valid) {
            throw new Error(`Pet schema validation failed: ${JSON.stringify(validatePet.errors, null, 2)}`);
        }
    }
}