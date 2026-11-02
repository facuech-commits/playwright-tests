import { expect } from '@playwright/test';
import { EventDetail } from '../poms/event.detail';

export class EventDetailTask {
  constructor(private readonly eventDetail: EventDetail) {}

  async goBack(): Promise<void> {
    await this.eventDetail.backButton.click();
  }

  async expectVisible(): Promise<void> {
    await this.eventDetail.title.expectVisible();
  }

  async expectSameDataAsCard(card: Record<string, string>): Promise<void> {
    await this.eventDetail.title.expectText(card.title);
    await this.eventDetail.meta.expectText(card.meta);
    await this.eventDetail.price.expectText(`${card.price} por entrada`);
    const stock = ((await this.eventDetail.stock.text()) ?? '').trim();
    expect(card.stock).toContain(`${stock} entradas disponibles`);
  }
}
