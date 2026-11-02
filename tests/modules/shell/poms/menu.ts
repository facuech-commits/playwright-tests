import { App } from 'tests/core/App';
import { Element } from 'tests/core/Element';

export class Menu {
  readonly nav: Element;
  readonly eventsLink: Element;
  readonly ticketsLink: Element;
  readonly cartLink: Element;
  readonly logoutButton: Element;

  constructor(readonly app: App) {
    this.nav = app.byCss('.navlinks');
    this.eventsLink = app.byCss('.navlinks button:text-is("Eventos")');
    this.ticketsLink = app.byCss('.navlinks button:text-is("Mis entradas")');
    this.cartLink = app.byCss('.navlinks button:has(.cart-badge)');
    this.logoutButton = app.byCss('.navlinks button:text-is("Salir")');
  }
}
