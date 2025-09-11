import { test } from '../../fixtures/customFixtures';
import { IProductInformation } from  '../../interfaces/ui/IProductInformation';

test.describe('DemoBlaze Tests - Product List Information tests', () => {
    let firstPageProductInformation: IProductInformation[] = [];
    let secondPageProductInformation: IProductInformation[] = [];

    test('001 - Validate get product list information from first 2 pages', async ({ headerPage, homePage, assertionsUI }) => {
        await test.step('Navigate to homepage', async () => {
            await homePage.navigateToHomePage('/');
            await homePage.waitForElementToBeVisible(headerPage.navbar);
        });

        await test.step('Get product list from first page and verify it is not empty', async () => {
            const productCount = await homePage.getProductCount();
            await assertionsUI.isGreaterThan(Number(productCount), 0);
        });

        await test.step('Get product titles, price and links from first page', async () => {
            firstPageProductInformation = await homePage.getAllProductsInformation();
        });

        await test.step('Navigate to second page and verify 2nd product list is not empty', async () => {
            await homePage.clickNextPage();
            await homePage.waitForElementToBeHidden(homePage.nextPageButton);

            const productCount2 = await homePage.getProductCount();
            await assertionsUI.isGreaterThan(Number(productCount2), 0);
        });

        await test.step('Get product titles, prices and links from second page', async () => {
            secondPageProductInformation = await homePage.getAllProductsInformation();
        });

        await test.step('Create and store product information for all products', async () => {
            const allProductsInfo = [...firstPageProductInformation, ...secondPageProductInformation];
            await assertionsUI.isTruthy(homePage.writeJSONFile('test-results/productsInformation.json', allProductsInfo));
        });
    });
});