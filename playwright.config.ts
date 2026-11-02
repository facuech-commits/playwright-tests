import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
import { Env } from './tests/core/Env';

dotenv.config({ path: '.env' });

export default defineConfig({
  timeout: 120_000,

  expect: {
    timeout: Number(process.env.E2E_EXPECT_TIMEOUT ?? 10000),
  },

  testDir: './tests',

  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [['html', { outputFolder: 'reports', open: 'never' }]],

  use: {
    launchOptions: {
      args: ['--start-maximized'],
    },

    baseURL: Env.str('BASE_URL', 'https://167-99-7-152.sslip.io/eventya/'),

    actionTimeout: Number(process.env.E2E_ACTION_TIMEOUT ?? 30000),
    navigationTimeout: Number(process.env.E2E_NAV_TIMEOUT ?? 30000),

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'Google Chrome',
      use: { channel: 'chrome', viewport: null },
      testIgnore: ['tests/modules/**'],
    },

    {
      name: 'EventYa',
      testDir: './tests/modules',
      timeout: Number(Env.str('TIMEOUT', '30000')),
      use: {
        baseURL: Env.str('BASE_URL', 'https://167-99-7-152.sslip.io/eventya/'),
        browserName: Env.str('BROWSER', 'chromium') as 'chromium' | 'firefox' | 'webkit',
        headless: Env.bool('HEADLESS', true),
        viewport: null,
        launchOptions: {
          args: ['--start-maximized'],
          slowMo: Number(Env.str('SLOW_MO', '0')),
        },
      },
    },
  ],
});
