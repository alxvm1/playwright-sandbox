// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';
import { env } from './src/config/env';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,   // сайт публичный, не душим
  timeout: 30_000,
  expect: {
    timeout: 7_000,
    toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: 'disabled' },
  },
  reporter: process.env.CI
    ? [['github'], ['blob']]
    : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: env.baseUrl,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    testIdAttribute: 'data-test',
    actionTimeout: 10_000,
  },
  projects: [
    { name: 'setup:customer', testMatch: /customer\.setup\.ts/ },
    { name: 'setup:admin', testMatch: /admin\.setup\.ts/ },

    {
      name: 'guest',
      testDir: './tests/e2e/auth',
      use: { ...devices['Desktop Chrome'], storageState: { cookies: [], origins: [] } },
    },
    {
      name: 'customer',
      testDir: './tests/e2e',
      testIgnore: ['**/admin/**', '**/auth/**'],
      use: { ...devices['Desktop Chrome'], storageState: env.storage.customer},
      dependencies: ['setup:customer'],
    },
    {
      name: 'admin',
      testDir: './tests/e2e/admin',
      use: { ...devices['Desktop Chrome'], storageState: env.storage.admin },
      dependencies: ['setup:admin'],
    },
    {
      name: 'api',
      testDir: './tests/api',
      use: { baseURL: env.apiUrl },
    },
    {
      name: 'visual',
      testDir: './tests/visual',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  snapshotPathTemplate: '{testDir}/__screenshots__/{projectName}/{arg}{ext}',
});