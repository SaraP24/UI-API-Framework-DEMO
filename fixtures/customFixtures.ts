import { test as base } from "@playwright/test";
import { HomePage } from "../page-objects/pages/HomePage";
import { ProductPage } from "../page-objects/pages/ProductPage";
import { Assertions } from "../helpers/Assertions";
import { Header } from "../page-objects/pages/Header";
import { CartPage } from "../page-objects/pages/CartPage";

type CustomFixtures = {
  homePage: HomePage;
  headerPage: Header;
  productPage: ProductPage;
  cartPage: CartPage;

  assertions: Assertions;
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

  assertions: async ({ page }, use) => {
    await use(new Assertions(page));
  }
});

export { test };