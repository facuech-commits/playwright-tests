import { App } from 'tests/core/App';
import { Element } from 'tests/core/Element';

export class TicketsList {
  readonly heading: Element;
  readonly ticketCards: Element;
  readonly ticketTitle: Element;
  readonly ticketInfo: Element;
  readonly ticketOwner: Element;

  constructor(readonly app: App) {
    this.heading = app.byXPath("//h1[text()='Mis entradas']");
    this.ticketCards = app.byCss('main .grid .card');
    this.ticketTitle = app.byCss('.ticket h1');
    this.ticketInfo = app.byCss('.ticket');
    this.ticketOwner = app.byCss('.ticket p:has-text("Titular") strong');
  }
}
