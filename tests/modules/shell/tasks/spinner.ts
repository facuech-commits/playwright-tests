import { expect } from '@playwright/test';
import { Spinner } from '../poms/spinner';

export class SpinnerTask {
  constructor(
    private readonly spinner: Spinner,
    private readonly defaultTimeoutMs: number,
  ) {}

  async waitUntilHidden(timeoutMs: number = this.defaultTimeoutMs): Promise<void> {
    const locator = await this.spinner.element.raw();
    await expect(locator).toBeHidden({ timeout: timeoutMs });
  }
}
