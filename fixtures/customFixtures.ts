import { test as base } from "@playwright/test";
import { HomePage } from "../page-objects/pages/HomePage";
import { ProductPage } from "../page-objects/pages/ProductPage";
import { Header } from "../page-objects/pages/Header";
import { CartPage } from "../page-objects/pages/CartPage";

import  AssertionsUI  from "../helpers/ui/AssertionsUI";
import  ApiAssertions  from "../helpers/api/ApiAssertions";

type CustomFixtures = {
  homePage: HomePage;
  headerPage: Header;
  productPage: ProductPage;
  cartPage: CartPage;

  assertionsUI: AssertionsUI;
  assertionsApi: ApiAssertions;
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
});

export { test };