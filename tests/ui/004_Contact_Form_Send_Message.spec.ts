import { test } from '../../fixtures/customFixtures';

test('004 - Verify to send a message from Contact form modal', async ({ homePage, headerPage, assertions }) => {
     await test.step('Navigate to homepage', async () => {
            await homePage.navigateToHomePage('/');
            await homePage.waitForElementToBeVisible(headerPage.navbar);
        });

        await test.step('Verify Contact form is visible', async () => {
            await headerPage.openContactForm();
        });

        await test.step('Verify all elements are present', async () => {
            const modalElements = await headerPage.newMessageModal.getAllModalElements();
            for (const element of modalElements) {
                await assertions.elementIsVisible(element);
            }
        });

        await test.step('Fill all fields in Contact form', async () => {
            await headerPage.newMessageModal.fillAllFields('userTestAccount@gmail.com', 'Test User', 'This is a test message');
        });

        await test.step('Click on Send message button', async () => {
            await assertions.elementIsVisible(headerPage.newMessageModal.sendMessageButton);
            await headerPage.newMessageModal.clickSendMessage();
        });

        await test.step('Verify modal is closed', async () => {
            await assertions.elementIsHidden(headerPage.newMessageModal.contactFormIdentifier);
        });
    });