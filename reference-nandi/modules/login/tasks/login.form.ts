import { LoginForm } from '../poms/login.form';

export class LoginFormTask {
  constructor(private readonly loginForm: LoginForm) {}

  async login(user: string, pass: string): Promise<void> {
    await this.loginForm.userInput.fill(user);
    await this.loginForm.passInput.fill(pass);
    await this.loginForm.submitButton.click();
  }

  async expectError(message: string): Promise<void> {
    await this.loginForm.errorMessage.expectText(message);
  }

  async expectNoError(): Promise<void> {
    await this.loginForm.errorMessage.expectEmpty();
  }

  async expectFormNotSubmitted(): Promise<void> {
    await this.loginForm.app.expectUrl(/login\.html/);
  }
}
