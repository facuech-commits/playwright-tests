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

  async expectTicketsVisible(): Promise<void> {
    await this.ticketsList.ticketCards.nth(0).expectVisible();
  }

  async openFirstTicket(): Promise<void> {
    await this.ticketsList.ticketCards.nth(0).cssChild('button:has-text("Ver entrada")').click();
  }

  async expectCodeAndQr(code: string): Promise<void> {
    await this.ticketsList.ticketCode.expectText(code);
    await this.ticketsList.qr.expectVisible();
  }

  async expectNoPaymentData(
    cardNumber: string,
    validationCode: string,
    balance: string,
  ): Promise<void> {
    const ticket = await this.ticketsList.ticketInfo.raw();
    await expect(ticket).not.toContainText(cardNumber);
    await expect(ticket).not.toContainText(validationCode);
    await expect(ticket).not.toContainText(balance);
  }

  async expectTicketCount(event: string, count: number): Promise<void> {
    await this.ticketsList.ticketCards.filter(event).expectCount(count);
  }
}
