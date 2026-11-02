import { App } from 'tests/core/App';
import { Element } from 'tests/core/Element';

export class EventDetail {
  readonly backButton: Element;
  readonly title: Element;
  readonly meta: Element;
  readonly stock: Element;
  readonly price: Element;
  readonly quantity: Element;
  readonly minusButton: Element;
  readonly plusButton: Element;
  readonly helpText: Element;
  readonly chips: Element;
  readonly addToCartButton: Element;

  constructor(readonly app: App) {
    this.chips = app.byCss('.detail-card .chip');
    this.addToCartButton = app.byCss('.detail-card button:has-text("Agregar al carrito")');
    this.quantity = app.byId('dqty');
    this.minusButton = app.byCss('.qty button:first-child');
    this.plusButton = app.byCss('.qty button:last-child');
    this.helpText = app.byCss('.detail-card .small');
    this.backButton = app.byCss('main button:has-text("Volver")');
    this.title = app.byCss('.detail-card h1');
    this.meta = app.byCss('.detail-card .meta');
    this.stock = app.byCss('.detail-card .stock-box span');
    this.price = app.byCss('.detail-card .price');
  }
}
