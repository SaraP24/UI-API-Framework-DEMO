import { defineConfig, devices } from '@playwright/test';
import Environments from './config/Environments';
import { Config } from './config/Config';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: Config.RETRIES,
  workers: Config.WORKERS,
  reporter: [
    ['html'], ['list']
  ],
  timeout: Config.UI_ACTION_TIMEOUT,
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: Config.HEADLESS,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        baseURL: Environments.staging || Config.UI_BASE_URL,
        ...devices['Desktop Chrome']
      },
    },
  /*   {
      name: 'firefox',
      use: {
        baseURL: Environments.staging,
        ...devices['Desktop Firefox']
      },
    },
    {
      name: 'webkit',
      use: {
        baseURL: Environments.staging,
        ...devices['Desktop Safari']
      },
    }, */

    {
      name: 'API Petstore project',
      testDir: './tests/api/petstore',
      use: {
        baseURL: Config.PETSTORE_BASE_URL,
        extraHTTPHeaders: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(Config.PETSTORE_API_TOKEN ? { Authorization: `Bearer ${Config.PETSTORE_API_TOKEN}` } : {})
        }
      },
    },
  ],

  // Global setup runs once before all workers
  globalSetup: require.resolve('./global-setup.ts'),
});

