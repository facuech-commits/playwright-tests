import { App } from 'tests/core/App';
import { Element } from 'tests/core/Element';

export class Dashboard {
  readonly currentUser: Element;
  readonly currentRole: Element;
  readonly logoutButton: Element;

  constructor(readonly app: App) {
    this.currentUser = app.byTestId('current-user');
    this.currentRole = app.byTestId('current-role');
    this.logoutButton = app.byTestId('logout-btn');
  }
}
