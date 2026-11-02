import { App } from 'tests/core/App';
import { Element } from 'tests/core/Element';

export class EventDetail {
  readonly backButton: Element;
  readonly title: Element;
  readonly meta: Element;
  readonly stock: Element;
  readonly price: Element;

  constructor(readonly app: App) {
    this.backButton = app.byCss('main button:has-text("Volver")');
    this.title = app.byCss('.detail-card h1');
    this.meta = app.byCss('.detail-card .meta');
    this.stock = app.byCss('.detail-card .stock-box span');
    this.price = app.byCss('.detail-card .price');
  }
}
