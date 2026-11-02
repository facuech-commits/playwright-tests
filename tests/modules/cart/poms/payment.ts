import { App } from 'tests/core/App';
import { Element } from 'tests/core/Element';

export class Payment {
  readonly total: Element;
  readonly payButton: Element;

  constructor(readonly app: App) {
    this.total = app.byCss('.summary .total');
    this.payButton = app.byId('payBtn');
  }
}
