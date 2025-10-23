import { expect, test } from '@playwright/test';

const REPO = 'api_test_repo_1';
const USER = 'SaraP24';


test.beforeAll(async ({ request }) => {
    const response = await request.post('/user/repos', {
        data: {
            name: REPO, 
            private: false,
            description: 'Repository created via API for testing purposes',
        }
    });
    expect(response.ok()).toBeTruthy();
})

test('Create issue on github repository', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Bug] report 1',
            body: 'Description of the bug...'
        }
    });
    expect(newIssue.status()).toBe(201);

    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();

    expect(await issues.json()).toContainEqual(expect.objectContaining({
            title: '[Bug] report 1',
            body: 'Description of the bug...'
        })
    );
});

test('Create feature request', async ({ request }) => {
    const newRequest = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Feature] request 1',
            body: 'Description of the feature...'
        }
    });
    expect(newRequest.ok()).toBeTruthy();

    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(
        expect.objectContaining({
            title: '[Feature] request 1',
            body: 'Description of the feature...'
        })
    );

    test.afterAll(async ({ request }) => {
        const response = await request.delete(`/repos/${USER}/${REPO}`);
        expect(response.ok()).toBeTruthy();
    })
    
})

