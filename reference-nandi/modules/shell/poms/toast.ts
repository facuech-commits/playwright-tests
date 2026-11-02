import { App } from 'tests/core/App';
import { Element } from 'tests/core/Element';

export class Toast {
  readonly element: Element;

  constructor(app: App) {
    this.element = app.byTestId('toast');
  }
}
