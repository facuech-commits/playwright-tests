import { App } from 'tests/core/App';
import { Element } from 'tests/core/Element';

export class Preferences {
  readonly compactModeToggle: Element;

  constructor(app: App) {
    this.compactModeToggle = app.byXPath('//*[@id="compact-mode-toggle"]', 0, 2);
  }
}
