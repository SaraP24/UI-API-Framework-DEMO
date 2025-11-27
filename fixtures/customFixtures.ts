import { test as base } from "@playwright/test";
import { HomePage } from "../page-objects/pages/HomePage";
import { ProductPage } from "../page-objects/pages/ProductPage";
import { Header } from "../page-objects/pages/Header";
import { CartPage } from "../page-objects/pages/CartPage";

import  AssertionsUI  from "../assertions/AssertionsUI";
import  ApiAssertions  from "../assertions/ApiAssertions";
import { PetStoreApiClient } from "../api-client/PetStoreApiClient";
import { IApiClientConfig } from "../interfaces/api/IApiClientConfig";

type CustomFixtures = {
  homePage: HomePage;
  headerPage: Header;
  productPage: ProductPage;
  cartPage: CartPage;

  assertionsUI: AssertionsUI;
  assertionsApi: ApiAssertions;
  petApi: PetStoreApiClient;
}

const test = base.extend<CustomFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  headerPage: async ({ page }, use) => {
    await use(new Header(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  assertionsUI: async ({ page }, use) => {
    await use(new AssertionsUI(page));
  },

  assertionsApi: async ({ request }, use) => {
    await use( new ApiAssertions(request));
  },

  petApi: async ({ request }, use) => {
    const config: IApiClientConfig = {
      baseURL: process.env.PETSTORE_BASE_URL || 'https://petstore.swagger.io/v2',
      requestContext: request,
      defaultHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(process.env.API_TOKEN ? { Authorization: `Bearer ${process.env.API_TOKEN}` } : {})
      },
      retries: 1
    };
    
    const client = new PetStoreApiClient(config);
    await use(client);
  }
});

export { test };