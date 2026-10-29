import { Page, FrameLocator, Locator, expect } from '@playwright/test';
import { Element } from './Element';

export interface AppConfig {
  baseUrl: string;
  highlightCss?: string;
  slowMo?: number;
}

export class App {
  private readonly popups: Page[] = [];

  constructor(
    private readonly page: Page,
    private readonly config: AppConfig,
  ) {
    this.page.on('popup', (popup) => {
      this.popups.push(popup);
    });
  }

  get raw(): Page {
    return this.page;
  }

  async goto(path: string): Promise<void> {
    await this.page.goto(new URL(path, this.config.baseUrl).toString());
  }

  byTestId(testId: string, popup = 0, iframe = 0): Element {
    return this.locate((scope) => scope.getByTestId(testId), popup, iframe);
  }

  byId(id: string, popup = 0, iframe = 0): Element {
    return this.locate((scope) => scope.locator(`#${id}`), popup, iframe);
  }

  byCss(selector: string, popup = 0, iframe = 0): Element {
    return this.locate((scope) => scope.locator(selector), popup, iframe);
  }

  byXPath(xpath: string, popup = 0, iframe = 0): Element {
    return this.locate((scope) => scope.locator(`xpath=${xpath}`), popup, iframe);
  }

  async expectUrl(pattern: RegExp | string, message?: string): Promise<void> {
    await expect(this.page, message).toHaveURL(pattern);
  }

  async expectPopupClosed(index: number, message?: string): Promise<void> {
    while (this.popups.length < index) {
      await this.page.waitForEvent('popup');
    }
    const popupPage = this.popups[index - 1];
    if (!popupPage.isClosed()) {
      await popupPage.waitForEvent('close').catch(() => {});
    }
    expect(popupPage.isClosed(), message).toBe(true);
  }

  private locate(
    build: (scope: Page | FrameLocator) => Locator,
    popup: number,
    iframe: number,
  ): Element {
    return new Element(
      async () => {
        const targetPage = popup <= 0 ? this.page : await this.resolvePopup(popup);
        const scope: Page | FrameLocator =
          iframe <= 0 ? targetPage : targetPage.frameLocator(`iframe >> nth=${iframe - 1}`);
        return build(scope);
      },
      this.config.highlightCss,
      this.config.slowMo,
    );
  }

  private async resolvePopup(index: number): Promise<Page> {
    while (this.popups.length < index) {
      await this.page.waitForEvent('popup');
    }
    const popupPage = this.popups[index - 1];
    await popupPage.waitForLoadState();
    return popupPage;
  }
}
