import { expect } from '@playwright/test';
import { TicketsList } from '../poms/tickets.list';

export class TicketsListTask {
  constructor(private readonly ticketsList: TicketsList) {}

  async expectVisible(): Promise<void> {
    await this.ticketsList.heading.expectVisible();
  }

  async expectNoTicketsVisible(): Promise<void> {
    await this.ticketsList.ticketCards.expectCount(0);
  }

  async expectTicket(event: string, date: string, owner: string): Promise<void> {
    await this.ticketsList.ticketTitle.expectText(event);
    await expect(await this.ticketsList.ticketInfo.raw()).toContainText(date);
    await this.ticketsList.ticketOwner.expectText(owner);
  }

  async expectTicketCount(event: string, count: number): Promise<void> {
    await this.ticketsList.ticketCards.filter(event).expectCount(count);
  }
}
