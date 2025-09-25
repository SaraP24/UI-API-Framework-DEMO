import { defineConfig, devices } from '@playwright/test';
import Environments from './enums/Environments';
import dotenv from 'dotenv';

dotenv.config();


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
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: process.env.PW_HEADLESS !== 'false',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        baseURL: Environments.prod,
        ...devices['Desktop Chrome']
      },
    },
    {
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
    },

    {
      name: 'API Petstore project',
      testDir: './tests/api/petstore',
      use: {
        baseURL: Environments.apiBaseUrlPetstore,
        extraHTTPHeaders: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${process.env.API_TOKEN}`
        }
      },
    },

    {
      name: 'API Github project',
      testDir: './tests/api/github',
      use: {
        baseURL: Environments.apiBaseUrlGithub,
        extraHTTPHeaders: {
          'Accept': 'application/vnd.github.v3+json',
          Authorization: `token ${process.env.GITHUB_TOKEN}`
        }
      },
    }
  ],
});

