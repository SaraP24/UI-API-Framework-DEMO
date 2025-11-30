import { test as base } from "@playwright/test";
import { HomePage } from "../page-objects/pages/HomePage";
import { ProductPage } from "../page-objects/pages/ProductPage";
import { Header } from "../page-objects/pages/Header";
import { CartPage } from "../page-objects/pages/CartPage";

import AssertionsUI from "../assertions/UI_Assertions";
import ApiAssertions from "../assertions/API_Assertions";

import { PetStoreApiClient } from "../api-client/PetStoreApiClient";
import { StoreApiClient } from "../api-client/StoreApiClient";
import { UserApiClient } from "../api-client/UserApiClient";
import { IApiClientConfig } from "../interfaces/api/IApiClientConfig";
import { Config } from "../config/Config";

type CustomFixtures = {
  homePage: HomePage;
  headerPage: Header;
  productPage: ProductPage;
  cartPage: CartPage;

  assertionsUI: AssertionsUI;
  assertionsApi: ApiAssertions;
  petApiClient: PetStoreApiClient;
  storeApiClient: StoreApiClient;
  userApiClient: UserApiClient;
};

const createApiClientConfig = (requestContext: any): IApiClientConfig => ({
  baseURL: Config.PETSTORE_BASE_URL,
  requestContext,
  defaultHeaders: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(Config.PETSTORE_API_TOKEN ? { Authorization: `Bearer ${Config.PETSTORE_API_TOKEN}` } : {})
  },
  retries: Config.API_RETRY_ATTEMPTS,
  timeout: Config.UI_NAVIGATION_TIMEOUT
});

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
    await use(new ApiAssertions(request));
  },

  petApiClient: async ({ request }, use) => {
    const config = createApiClientConfig(request);
    const client = new PetStoreApiClient(config);
    await use(client);
  },

  storeApiClient: async ({ request }, use) => {
    const config = createApiClientConfig(request);
    const client = new StoreApiClient(config);
    await use(client);
  },

  userApiClient: async ({ request }, use) => {
    const config = createApiClientConfig(request);
    const client = new UserApiClient(config);
    await use(client);
  }
});

export { test };