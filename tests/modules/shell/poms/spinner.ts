import { App } from 'tests/core/App';
import { Element } from 'tests/core/Element';

export class Spinner {
  readonly element: Element;

  constructor(app: App) {
    this.element = app.byTestId('spinner');
  }
}
