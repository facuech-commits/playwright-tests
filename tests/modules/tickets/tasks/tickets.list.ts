import { TicketsList } from '../poms/tickets.list';

export class TicketsListTask {
  constructor(private readonly ticketsList: TicketsList) {}

  async expectVisible(): Promise<void> {
    await this.ticketsList.heading.expectVisible();
  }

  async expectNoTicketsVisible(): Promise<void> {
    await this.ticketsList.ticketCards.expectCount(0);
  }
}
