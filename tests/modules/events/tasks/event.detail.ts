import { expect } from '@playwright/test';
import { EventDetail } from '../poms/event.detail';

export class EventDetailTask {
  constructor(private readonly eventDetail: EventDetail) {}

  async goBack(): Promise<void> {
    await this.eventDetail.backButton.click();
  }

  async decrease(): Promise<void> {
    await this.eventDetail.minusButton.click();
  }

  async increase(times = 1): Promise<void> {
    for (let i = 0; i < times; i++) {
      await this.eventDetail.plusButton.click();
    }
  }

  async expectQuantity(value: string): Promise<void> {
    await this.eventDetail.quantity.expectText(value);
  }

  async expectHelpText(text: string): Promise<void> {
    await this.eventDetail.helpText.expectText(text);
  }

  async expectSoldOut(stock: string, status: string): Promise<void> {
    await this.eventDetail.stock.expectText(stock);
    await this.eventDetail.chips.filter(status).expectVisible();
  }

  async expectAddToCartDisabled(): Promise<void> {
    const button = await this.eventDetail.addToCartButton.raw();
    if ((await button.count()) > 0) {
      await expect(button).toBeDisabled();
    }
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
