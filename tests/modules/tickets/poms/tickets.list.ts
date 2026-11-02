import { App } from 'tests/core/App';
import { Element } from 'tests/core/Element';

export class TicketsList {
  readonly heading: Element;
  readonly ticketCards: Element;

  constructor(readonly app: App) {
    this.heading = app.byXPath("//h1[text()='Mis entradas']");
    this.ticketCards = app.byCss('main .grid .card');
  }
}
