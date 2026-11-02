import { App } from 'tests/core/App';
import { Element } from 'tests/core/Element';

export class LoginForm {
  readonly userInput: Element;
  readonly passInput: Element;
  readonly submitButton: Element;

  constructor(readonly app: App) {
    this.userInput = app.byId('u');
    this.passInput = app.byId('p');
    this.submitButton = app.byCss('form.form button');
  }

  async goto(): Promise<void> {
    await this.app.goto('');
  }
}
