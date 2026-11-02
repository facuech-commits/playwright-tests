import { expect } from '@playwright/test';
import { Menu } from '../poms/menu';

export class MenuTask {
  constructor(private readonly menu: Menu) {}

  async goToEvents(): Promise<void> {
    await this.menu.eventsLink.click();
  }

  async goToTickets(): Promise<void> {
    await this.menu.ticketsLink.click();
  }

  async logout(): Promise<void> {
    await this.menu.logoutButton.click();
  }

  async expectVisible(): Promise<void> {
    await this.menu.eventsLink.expectVisible();
    await this.menu.ticketsLink.expectVisible();
    await this.menu.cartLink.expectVisible();
    await this.menu.logoutButton.expectVisible();
  }

  async goToCart(): Promise<void> {
    await this.menu.cartLink.click();
  }

  async expectCartCount(count: string): Promise<void> {
    await this.menu.cartBadge.expectText(count);
  }

  async expectCartNotEmpty(): Promise<void> {
    await expect(await this.menu.cartBadge.raw()).not.toHaveText('0');
  }

  async expectHidden(): Promise<void> {
    await this.menu.nav.expectHidden();
  }
}
