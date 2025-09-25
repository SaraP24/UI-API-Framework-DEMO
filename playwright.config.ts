import { defineConfig, devices } from '@playwright/test';
import Environments from './enums/Environments';


export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 0,
  workers: 4,
  reporter: [
    ['html'], ['list']
  ],
  timeout: 120000,
  use: {
    baseURL: Environments.prod,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: process.env.PW_HEADLESS !== 'false',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});

