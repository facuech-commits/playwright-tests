import { expect } from '@playwright/test';
import { Cart } from '../poms/cart';

export class CartTask {
  constructor(private readonly cart: Cart) {}

  async continueToPayment(): Promise<void> {
    await this.cart.continueButton.click();
  }

  async remove(): Promise<void> {
    await this.cart.removeButton.click();
  }

  async expectItem(name: string, unitPrice: string, quantity: string): Promise<void> {
    await expect(await this.cart.item.raw()).toContainText(name);
    await expect(await this.cart.item.cssChild('.meta').raw()).toContainText(unitPrice);
    await this.cart.item.cssChild('.qty strong').expectText(quantity);
  }

  async expectSummary(subtotal: string, discount: string, total: string): Promise<void> {
    await this.cart.subtotal.expectText(subtotal);
    await this.cart.discount.expectText(discount);
    await this.cart.total.expectText(total);
  }

  async expectEmpty(): Promise<void> {
    await this.cart.emptyMessage.expectVisible();
  }
}
