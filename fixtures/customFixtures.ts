import { test as base } from "@playwright/test";
import { HomePage } from "../page-objects/pages/HomePage";
import { ProductPage } from "../page-objects/pages/ProductPage";
import { Header } from "../page-objects/pages/Header";
import { CartPage } from "../page-objects/pages/CartPage";

import  AssertionsUI  from "../assertions/AssertionsUI";
import  ApiAssertions  from "../assertions/ApiAssertions";
import { PetStoreApiClient } from "../api-client/PetStoreApiClient";
import { IApiClientConfig } from "../interfaces/api/IApiClientConfig";
import { Config } from "../src/config/Config";

import chalk from "chalk";

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
      baseURL: Config.PETSTORE_BASE_URL,
      requestContext: request,
      defaultHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(Config.PETSTORE_API_TOKEN ? { Authorization: `Bearer ${Config.PETSTORE_API_TOKEN}` } : {})
      },
      retries: Config.API_RETRY_ATTEMPTS,
      timeout: Config.UI_NAVIGATION_TIMEOUT
    };
    
    const client = new PetStoreApiClient(config);
    await use(client);
  }
});

test.beforeAll(async () => {
  console.log(chalk.blue('\n' + '='.repeat(50)));
    console.log(chalk.blue('TEST EXECUTION STARTED - Configuration Summary'));
    console.log(chalk.blue('='.repeat(50)));
    Config.printConfig();
});

export { test };