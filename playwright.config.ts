import { defineConfig, devices } from '@playwright/test';
import Environments from './enums/Environments';
import { Config } from './src/config/Config';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 2,
  workers: Config.WORKERS,
  reporter: [
    ['html'], ['list']
  ],
  timeout: 120000,
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
        baseURL: Environments.prod,
        ...devices['Desktop Firefox']
      },
    },
    {
      name: 'webkit',
      use: {
        baseURL: Environments.prod,
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
});

