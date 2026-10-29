import { App } from 'tests/core/App';
import { Element } from 'tests/core/Element';

export class LoginForm {
  readonly userInput: Element;
  readonly passInput: Element;
  readonly submitButton: Element;
  readonly errorMessage: Element;

  constructor(readonly app: App) {
    this.userInput = app.byId('user');
    this.passInput = app.byCss('.login-pass-css');
    this.submitButton = app.byXPath("//button[@type='submit']");
    this.errorMessage = app.byTestId('login-error');
  }

  async goto(): Promise<void> {
    await this.app.goto('/login.html');
  }
}
