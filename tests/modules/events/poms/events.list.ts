import { App } from 'tests/core/App';
import { Element } from 'tests/core/Element';

export class EventsList {
  readonly searchInput: Element;
  readonly countLabel: Element;
  readonly cards: Element;

  constructor(readonly app: App) {
    this.searchInput = app.byId('search');
    this.countLabel = app.byId('eventCount');
    this.cards = app.byCss('#eventGrid .event-card');
  }

  // sirve para los numeros y para Anterior / Siguiente
  botonPagina(texto: string): Element {
    return this.app.byCss(`#eventPager button:has-text("${texto}")`);
  }

  categoryButton(name: string): Element {
    return this.app.byCss(`.category-list button:text-is("${name}")`);
  }
}
