import { App } from 'tests/core/App';
import { Element } from 'tests/core/Element';

export class Payment {
  readonly total: Element;
  readonly payButton: Element;
  readonly method: Element;
  readonly cardId: Element;
  readonly confirmTitle: Element;
  readonly purchaseNumber: Element;
  readonly confirmCard: Element;
  readonly viewTicketButton: Element;

  constructor(readonly app: App) {
    this.total = app.byCss('.summary .total');
    this.payButton = app.byId('payBtn');
    this.method = app.byId('method');
    this.cardId = app.byId('payid');
    this.confirmTitle = app.byCss('main .card h1');
    this.purchaseNumber = app.byCss('main .card p:has-text("Número de compra") strong');
    this.confirmCard = app.byCss('main .card');
    this.viewTicketButton = app.byCss('main button:has-text("Ver mi entrada")');
  }
}
