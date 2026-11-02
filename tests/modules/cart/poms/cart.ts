import { App } from 'tests/core/App';
import { Element } from 'tests/core/Element';

export class Cart {
  readonly item: Element;
  readonly removeButton: Element;
  readonly subtotal: Element;
  readonly discount: Element;
  readonly total: Element;
  readonly continueButton: Element;
  readonly emptyMessage: Element;

  constructor(readonly app: App) {
    this.item = app.byCss('main .card:has(button:has-text("Eliminar"))');
    this.removeButton = app.byCss('main button:has-text("Eliminar")');
    this.subtotal = app.byCss('.summary .row:has-text("Subtotal") strong');
    this.discount = app.byCss('.summary .row:has-text("Descuento") strong');
    this.total = app.byCss('.summary span.total').nth(1);
    this.continueButton = app.byCss('.summary button:has-text("Continuar al pago")');
    this.emptyMessage = app.byCss('main :text-is("Tu carrito está vacío.")');
  }
}
