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

  async selectMethod(method: string): Promise<void> {
    await this.payment.method.selectOption(method);
  }

  async expectCardIdEmpty(): Promise<void> {
    await this.payment.cardId.expectValue('');
  }

  // igual que en el login, el error sale en un alert()
  async payExpectingAlert(): Promise<string> {
    const page = this.payment.app.raw;
    const dialogMessage = new Promise<string>((resolve) => {
      page.once('dialog', async (dialog) => {
        resolve(dialog.message());
        await dialog.accept();
      });
    });
    await this.payment.payButton.click();
    return dialogMessage;
  }

  async expectVisible(): Promise<void> {
    await this.payment.heading.expectVisible();
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
