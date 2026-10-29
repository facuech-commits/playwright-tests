import { App } from 'tests/core/App';
import { Element } from 'tests/core/Element';

export class Profile {
  readonly trigger: Element;
  readonly usernameValue: Element;
  readonly roleValue: Element;
  readonly closeButton: Element;

  constructor(readonly app: App) {
    this.trigger = app.byTestId('current-user');
    this.usernameValue = app.byTestId('profile-user', 1);
    this.roleValue = app.byId('profile-role', 1);
    this.closeButton = app.byCss('.profile-close-css', 1, 1);
  }
}
