import { Locator, expect } from '@playwright/test';

type LocatorResolver = () => Locator | Promise<Locator>;

export class Element {
  constructor(
    private readonly resolve: LocatorResolver,
    private readonly highlightCss: string = '',
    private readonly slowMo: number = 0,
  ) {}

  async raw(): Promise<Locator> {
    return this.resolve();
  }

  private async highlight(locator: Locator): Promise<void> {
    if (!this.highlightCss) return;
    try {
      if ((await locator.count()) === 0) return;
      await locator.evaluate((el, css) => {
        (el as HTMLElement).style.cssText += `;${css}`;
      }, this.highlightCss);
      if (this.slowMo === 0) {
        await locator.page().waitForTimeout(300);
      }
    } catch {
      // ignore — highlighting is a debug aid, never fails the test
    }
  }

  private async resolveAndHighlight(): Promise<Locator> {
    const locator = await this.resolve();
    await this.highlight(locator);
    return locator;
  }

  filter(text: string): Element {
    return new Element(
      async () => (await this.resolve()).filter({ hasText: text }),
      this.highlightCss,
      this.slowMo,
    );
  }

  child(testId: string): Element {
    return new Element(
      async () => (await this.resolve()).getByTestId(testId),
      this.highlightCss,
      this.slowMo,
    );
  }

  cssChild(selector: string): Element {
    return new Element(
      async () => (await this.resolve()).locator(selector),
      this.highlightCss,
      this.slowMo,
    );
  }

  nth(index: number): Element {
    return new Element(
      async () => (await this.resolve()).nth(index),
      this.highlightCss,
      this.slowMo,
    );
  }

  async all(): Promise<Element[]> {
    const locator = await this.resolve();
    const locators = await locator.all();
    return locators.map((item) => new Element(() => item, this.highlightCss, this.slowMo));
  }

  async count(): Promise<number> {
    const locator = await this.resolve();
    return locator.count();
  }

  async text(): Promise<string | null> {
    const locator = await this.resolveAndHighlight();
    return locator.textContent();
  }

  async click(): Promise<void> {
    const locator = await this.resolveAndHighlight();
    await locator.click();
  }

  async clickAndAcceptDialog(): Promise<void> {
    const locator = await this.resolveAndHighlight();
    locator.page().once('dialog', (dialog) => dialog.accept());
    await locator.click();
  }

  async fill(value: string): Promise<void> {
    const locator = await this.resolveAndHighlight();
    await locator.fill(value);
  }

  async selectOption(value: string): Promise<void> {
    const locator = await this.resolveAndHighlight();
    await locator.selectOption(value);
  }

  async expectVisible(message?: string): Promise<void> {
    const locator = await this.resolveAndHighlight();
    await expect(locator, message).toBeVisible();
  }

  async expectHidden(message?: string): Promise<void> {
    const locator = await this.resolveAndHighlight();
    await expect(locator, message).toBeHidden();
  }

  async expectCount(count: number, message?: string): Promise<void> {
    const locator = await this.resolveAndHighlight();
    await expect(locator, message).toHaveCount(count);
  }

  async expectText(text: string, message?: string): Promise<void> {
    const locator = await this.resolveAndHighlight();
    await expect(locator, message).toHaveText(text);
  }

  async expectEmpty(message?: string): Promise<void> {
    const locator = await this.resolveAndHighlight();
    await expect(locator, message).toBeEmpty();
  }

  async expectValue(value: string, message?: string): Promise<void> {
    const locator = await this.resolveAndHighlight();
    await expect(locator, message).toHaveValue(value);
  }
}
