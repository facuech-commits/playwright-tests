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

  async expectHidden(): Promise<void> {
    await this.menu.nav.expectHidden();
  }
}
