import { test as base, expect } from '@playwright/test';
import { App, AppConfig } from 'tests/core/App';
import { Env } from 'tests/core/Env';

type Fixtures = {
  app: App;
};

const appConfig: Omit<AppConfig, 'baseUrl'> = {
  highlightCss: Env.str('HIGHLIGHT_CSS', ''),
  slowMo: Number(Env.str('SLOW_MO', '0')),
};

export const test = base.extend<Fixtures>({
  app: async ({ page, baseURL }, use) => {
    await use(new App(page, { ...appConfig, baseUrl: baseURL! }));
  },
});

export { expect };
