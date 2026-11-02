import { App } from 'tests/core/App';
import { Element } from 'tests/core/Element';

export class EventsList {
  readonly searchInput: Element;
  readonly countLabel: Element;
  readonly cards: Element;
  readonly prevButton: Element;
  readonly nextButton: Element;
  readonly pageButtons: Element;

  constructor(readonly app: App) {
    this.searchInput = app.byId('search');
    this.countLabel = app.byId('eventCount');
    this.cards = app.byCss('#eventGrid .event-card');
    this.prevButton = app.byCss('#eventPager button:has-text("Anterior")');
    this.nextButton = app.byCss('#eventPager button:has-text("Siguiente")');
    this.pageButtons = app.byCss('#eventPager button:text-matches("^[0-9]+$")');
  }

  pageButton(number: string): Element {
    return this.app.byCss(`#eventPager button:text-is("${number}")`);
  }

  categoryButton(name: string): Element {
    return this.app.byCss(`.category-list button:text-is("${name}")`);
  }
}
