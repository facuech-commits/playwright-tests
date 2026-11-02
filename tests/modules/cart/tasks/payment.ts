import { expect } from '@playwright/test';
import { Payment } from '../poms/payment';

export class PaymentTask {
  constructor(private readonly payment: Payment) {}

  async expectTotal(total: string, payButton: string): Promise<void> {
    await this.payment.total.expectText(total);
    await this.payment.payButton.expectText(payButton);
  }

  async pay(method: string, cardId: string): Promise<void> {
    await this.payment.method.selectOption(method);
    await this.payment.cardId.fill(cardId);
    await this.payment.payButton.click();
  }

  async expectConfirmed(title: string, summary: string): Promise<void> {
    await this.payment.confirmTitle.expectText(title);
    await expect(await this.payment.purchaseNumber.raw()).not.toBeEmpty();
    await expect(await this.payment.confirmCard.raw()).toContainText(summary);
  }

  async viewTicket(): Promise<void> {
    await this.payment.viewTicketButton.click();
  }
}
