import fs from 'fs';
import fetch from 'node-fetch';

const SWAGGER_URL = 'https://petstore.swagger.io/v2/swagger.json';

type SwaggerDoc = {
  swagger: string;
  paths: Record<string, any>;
};

// Genera un payload de ejemplo a partir del schema o example del Swagger
function generatePayload(schema: any): any {
  if (!schema) return {};

  if (schema.example) return schema.example;

  if (schema.type === 'object' && schema.properties) {
    const obj: any = {};
    for (const [key, prop] of Object.entries<any>(schema.properties)) {
      if (prop.example !== undefined) obj[key] = prop.example;
      else if (prop.type === 'string') obj[key] = `${key}_example`;
      else if (prop.type === 'integer') obj[key] = Math.floor(Math.random() * 1000);
      else if (prop.type === 'array') obj[key] = [generatePayload(prop.items)];
      else if (prop.type === 'boolean') obj[key] = true;
      else obj[key] = null;
    }
    return obj;
  }

  return {};
}

async function generateTests() {
  const res = await fetch(SWAGGER_URL);
  const swagger = (await res.json()) as SwaggerDoc;

  let output = `import { test, request, expect } from "@playwright/test";
import { PetstoreClient } from "../api-client/pet-store-api-client";

let api: PetstoreClient;
test.beforeAll(async () => {
  const context = await request.newContext();
  api = new PetstoreClient(context);
});
`;

  for (const [path, methods] of Object.entries(swagger.paths)) {
    for (const [method, details] of Object.entries<any>(methods)) {
      let payloadCode = '';
      let payloadVar = '';

      if (['post', 'put'].includes(method) && details.parameters) {
        const bodyParam = details.parameters.find((p: any) => p.in === 'body');
        if (bodyParam && bodyParam.schema) {
          const payload = generatePayload(bodyParam.schema);
          payloadVar = 'payload';
          payloadCode = `const payload = ${JSON.stringify(payload, null, 2)};\n  `;
        }
      }

      output += `
test('${method.toUpperCase()} ${path}', async () => {
  ${payloadCode}const res = await api.${method}(\`${path.replace(/{/g, '${')}\`${payloadVar ? `, ${payloadVar}` : ''});
  expect(res.status(), "El código de estado debe ser 200").toBe(200);
});
`;
    }
  }

  fs.writeFileSync('./tests/generated-petstore.spec.ts', output);
  console.log('✅ Tests generados en tests/generated-petstore.spec.ts');
}

generateTests();