import { APIRequestContext, APIResponse } from "playwright/test";

export class PetstoreClient {
  private baseURL = 'https://petstore.swagger.io/v2';
  private headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  constructor(private requestContext: APIRequestContext) {}

  async get(endpoint: string) {
    return await this.requestContext.get(`${this.baseURL}${endpoint}`, {
      headers: this.headers
    });
  }

  async post(endpoint: string, data: object) {
    return await this.requestContext.post(`${this.baseURL}${endpoint}`, {
      data,
      headers: this.headers
    });
  }

  async put(endpoint: string, data: object) {
    return await this.requestContext.put(`${this.baseURL}${endpoint}`, {
      data,
      headers: this.headers
    });
  }

  async delete(endpoint: string) {
    return await this.requestContext.delete(`${this.baseURL}${endpoint}`, {
      headers: this.headers
    });
  }
  
    private async mockResponse(endpoint: string, method: string): Promise<APIResponse> {
    console.warn(`📴 Modo offline: simulando ${method} ${endpoint}`);
    return {
        status: () => 200,
        ok: true,
        json: async () => ({ message: `Simulated ${method} response for ${endpoint}` })
    } as unknown as APIResponse;
  }
}