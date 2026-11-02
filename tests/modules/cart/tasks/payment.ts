import { Payment } from '../poms/payment';

export class PaymentTask {
  constructor(private readonly payment: Payment) {}

  async expectTotal(total: string, payButton: string): Promise<void> {
    await this.payment.total.expectText(total);
    await this.payment.payButton.expectText(payButton);
  }
}
